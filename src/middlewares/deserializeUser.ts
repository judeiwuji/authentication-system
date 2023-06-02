import { NextFunction, Request, Response } from "express";
import SessionAuth from "../auth/SessionAuth";
import IRequest from "../models/interfaces/IRequest";

export default async function deserializeUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies["session"];
  const auth = new SessionAuth();

  if (session) {
    try {
      req.user = await auth.findUserBySession(session);
    } catch (error) {
      console.debug(error);
    }
  }
  next();
}
