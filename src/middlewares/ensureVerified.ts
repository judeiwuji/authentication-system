import { NextFunction, Request, Response } from 'express';
import SessionAuth from '../auth/SessionAuth';
import VerificationService from '../services/VerificationService';
import JWTUtil from '../utils/JWTUtil';
import toQueryParamString from '../helpers/toQueryParamString';
import { config } from 'dotenv';
import { error } from 'console';
config();

export default async function ensureVerified(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies['session'];
  const auth = new SessionAuth();

  if (session) {
    try {
      const verificationService = new VerificationService();
      const user = await auth.findUserBySession(session);
      if (user.verified) {
        next();
        return;
      }

      const code = verificationService.generateCode();
      verificationService.sendCode(user, code);
      const token = verificationService.generateToken(user.email, code);
      res.redirect(
        `/verifyEmail${toQueryParamString({
          state: token,
          client: req.body.client,
        })}`
      );
    } catch (error) {
      console.debug(error);
      next();
    }
  }
}
