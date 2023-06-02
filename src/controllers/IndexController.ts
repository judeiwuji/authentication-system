import { Request, Response } from 'express';
import UserService from '../services/UserService';
import validateSchema from '../validators/validatorSchema';
import { UserCreationSchema } from '../validators/schemas/UserSchema';
import JWTUtil from '../utils/JWTUtil';
import secretQuestions from '../data/secretQuestions';
import VerificationService from '../services/VerificationService';
import IRequest from '../models/interfaces/IRequest';
import AppConfig from '../config/appConfig';
import toQueryParamString from '../helpers/toQueryParamString';
import { config } from 'dotenv';
config();

export default class IndexController {
  private userService = new UserService();
  private verificationService = new VerificationService();

  getHomePage(req: IRequest, res: Response) {
    res.render('index', {
      page: {
        title: `${AppConfig.appName}`,
        description:
          'Your passport on the internet. Create one identity for all websites.',
      },
      path: req.path,
      isLoggedIn: !!req.user,
      isDeveloper: !!req.user?.developer,
      appName: AppConfig.appName,
    });
  }

  getSignupPage(req: Request, res: Response) {
    res.render('signup', {
      page: {
        title: `Signup - ${AppConfig.appName}`,
        description: 'Create one identity for your net surfing',
      },
      path: req.path,
      questions: secretQuestions,
      appName: AppConfig.appName,
      client: req.query.client,
    });
  }

  async userSignup(req: Request, res: Response) {
    try {
      const data = await validateSchema(UserCreationSchema, req.body);
      const user = await this.userService.createUser(data);

      const code = this.verificationService.generateCode();
      const token = this.verificationService.generateToken(user.email, code);
      this.verificationService.sendCode(user, code);

      res.redirect(
        `/verifyEmail${toQueryParamString({
          state: token,
          client: req.body.client,
        })}`
      );
    } catch (error: any) {
      console.debug(error);
      res.render('signup', {
        page: {
          title: `Signup - ${AppConfig.appName}`,
          description: 'Create one identity for your net surfing',
        },
        path: req.path,
        error,
        data: req.body,
        questions: secretQuestions,
        appName: AppConfig.appName,
      });
    }
  }

  getLoginPage(req: Request, res: Response) {
    res.render('login', {
      page: {
        title: `Login - ${AppConfig.appName}`,
        description: `Login into your ${AppConfig.appName}`,
      },
      path: req.path,
      appName: AppConfig.appName,
      client: req.query.client,
    });
  }

  getNotFoundPage(req: IRequest, res: Response) {
    res.render('error404', {
      page: {
        title: `Error 404 - ${AppConfig.appName}`,
        description: `Page not found`,
      },
      isLoggedIn: !!req.user,
      isDeveloper: req.user && req.user.developer,
    });
  }
}
