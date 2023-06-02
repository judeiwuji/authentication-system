import { Request, Response } from 'express';
import DeveloperService from '../services/DeveloperService';
import validateSchema from '../validators/validatorSchema';
import {
  DeveloperCreationSchema,
  DeveloperUpdateSchema,
} from '../validators/schemas/DeveloperSchema';
import VerificationService from '../services/VerificationService';
import JWTUtil from '../utils/JWTUtil';
import developerRoles from '../data/developerRoles';
import IRequest from '../models/interfaces/IRequest';
import ClientAppService from '../services/ClientAppService';
import Developer from '../models/Developer';
import User from '../models/User';
import AppConfig from '../config/appConfig';

export default class DeveloperController {
  private verificationService = new VerificationService();
  private developerService = new DeveloperService();
  private clientAppService = new ClientAppService();

  async getDashboard(req: IRequest, res: Response) {
    const { page } = req.query;

    const apps = await this.clientAppService.getApps(
      Number(page || 1),
      req.user?.developer as Developer
    );
    res.render('developer/dashboard', {
      page: {
        title: `Dashboard - ${AppConfig.appName}`,
        description: 'Manage your applications',
      },
      path: req.path,
      isLoggedIn: !!req.user,
      isDeveloper: req.user && req.user.developer,
      apps,
      tab: req.query.tab,
    });
  }

  getProfile(req: IRequest, res: Response) {
    res.render('developer/profile', {
      page: {
        title: `Developer Profile - ${AppConfig.appName}`,
        description: 'Edit your account profile',
      },
      path: req.path,
      isLoggedIn: !!req.user,
      isDeveloper: req.user && req.user.developer,
      user: req.user?.toJSON(),
      roles: developerRoles,
    });
  }

  getSignupPage(req: Request, res: Response) {
    res.render('developer/signup', {
      page: {
        title: `Developer Signup - ${AppConfig.appName}`,
        description:
          'Start integrating Internet Passsport into your applications',
      },
      path: req.path,
      roles: developerRoles,
    });
  }

  getLoginPage(req: Request, res: Response) {
    res.render('developer/login', {
      page: {
        title: `Developer login - ${AppConfig.appName}`,
        description:
          'Start integrating Internet Passsport into your applications',
      },
      path: req.path,
    });
  }

  async signup(req: Request, res: Response) {
    try {
      const data = await validateSchema(DeveloperCreationSchema, req.body);
      const developer = await this.developerService.createDeveloper(data);
      const user = developer.user;

      const code = this.verificationService.generateCode();
      const token = this.verificationService.generateToken(user.email, code);
      this.verificationService.sendCode(user, code);
      res.redirect(`/verifyEmail?state=${token}`);
    } catch (error: any) {
      console.debug(error);
      res.render('developer/signup', {
        page: {
          title: `Developer Signup - ${AppConfig.appName}`,
          description: 'Create one identity for your net surfing',
        },
        path: req.path,
        error,
        data: req.body,
        roles: developerRoles,
      });
    }
  }

  async updateProfile(req: IRequest, res: Response) {
    try {
      const data = await validateSchema(DeveloperUpdateSchema, req.body);
      const updated = await this.developerService.updateDeveloper(
        data,
        req.user as User
      );
      req.flash(
        updated ? 'info' : 'error',
        updated ? 'Profile updated successfully' : 'Failed to update'
      );
    } catch (error: any) {
      req.flash('error', error.message);
    }
    res.redirect('/developer/profile');
  }
}
