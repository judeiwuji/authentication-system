import { NextFunction, Response } from 'express';
import IRequest from '../models/interfaces/IRequest';
import JWTUtil from '../utils/JWTUtil';
import SessionAuth from '../auth/SessionAuth';

export default async function ensureAuthenticated(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies['session'];
  const auth = new SessionAuth();

  if (session) {
    try {
      const user = await auth.findUserBySession(session);
      if (user) {
        next();
        return;
      }
    } catch (error) {
      console.debug(error);
    }
  }
  res.status(401).send();
}
