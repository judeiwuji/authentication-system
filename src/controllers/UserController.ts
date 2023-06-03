import { Request, Response } from 'express';
import IRequest from '../models/interfaces/IRequest';
import secretQuestions from '../data/secretQuestions';
import validateSchema from '../validators/validatorSchema';
import {
  UserPublicProfileRequest,
  UserSecretUpdateSchema,
  UserUpdateSchema,
} from '../validators/schemas/UserSchema';
import UserService from '../services/UserService';
import JWTUtil from '../utils/JWTUtil';
import AppConfig from '../config/appConfig';

export default class UserController {
  private userService = new UserService();

  async getDashboard(req: IRequest, res: Response) {
    if (req.user && req.user.developer) {
      res.redirect('/website/dashboard');
    }
    const apps = await this.userService.getApps(req.user?.id as string);
    const devices = await this.userService.getDevices(req.user?.id as string);
    res.render('user/dashboard', {
      page: {
        title: `Dashboard - ${AppConfig.appName}`,
        description: 'Manage connected apps and devices',
      },
      path: req.path,
      isLoggedIn: !!req.user,
      isDeveloper: !!req.user?.developer,
      devices,
      apps,
    });
  }

  getProfilePage(req: IRequest, res: Response) {
    res.render('user/profile', {
      page: {
        title: `Profile - ${AppConfig.appName}`,
        description: 'Edit your account profile',
      },
      path: req.path,
      isLoggedIn: !!req.user,
      isDeveloper: false,
      user: req.user?.toJSON(),
      questions: secretQuestions,
    });
  }

  async updateProfile(req: IRequest, res: Response) {
    const user = req.user;

    try {
      const data = await validateSchema(UserUpdateSchema, req.body);
      const updated = await this.userService.updateUser({
        ...data,
        id: user?.id,
      });
      req.flash(
        updated ? 'info' : 'error',
        updated ? 'Account updated successfully' : 'Failed to update'
      );
    } catch (error: any) {
      req.flash('error', error.message);
    }
    res.redirect('/profile');
  }

  async updateSecret(req: IRequest, res: Response) {
    const user = req.user;
    try {
      const data = await validateSchema(UserSecretUpdateSchema, req.body);
      data.userId = user?.id as string;

      const updated = await this.userService.updateUserSecret(data);
      req.flash(
        updated ? 'info' : 'error',
        updated ? 'Secret updated successfully' : 'Failed to update secret'
      );
    } catch (error: any) {
      req.flash('error', error.message);
    }
    res.redirect('/profile');
  }

  async deleteDevice(req: IRequest, res: Response) {
    try {
      await this.userService.deleteDevice(
        req.params.id,
        req.user?.id as string
      );
      req.flash('info', 'Device removed');
    } catch (error: any) {
      req.flash('error', error.message);
    }
    res.redirect('/dashboard');
  }

  async deleteApp(req: IRequest, res: Response) {
    try {
      await this.userService.deleteApp(req.params.id, req.user?.id as string);
      req.flash('info', 'App removed');
    } catch (error: any) {
      req.flash('error', error.message);
    }
    res.redirect('/dashboard');
  }

  async getPublicProfile(req: Request, res: Response) {
    const { authorization } = req.headers;
    const secret = req.headers['x-secret'] as string;
    let status = 200;
    try {
      if (!authorization) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
      }

      if (!secret) {
        res.status(400).send({ error: 'Missing secret' });
        return;
      }

      const token = authorization.split(' ')[1];
      const jwtData = JWTUtil.verify({ token, secret });
      const profile = await this.userService.getPublicProfile(jwtData.user);
      res.send(profile);
    } catch (error: any) {
      res.status(400).send({ status: error.message });
    }
  }
}
