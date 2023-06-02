import { Request } from "express";
import User from "../User";

export default interface IRequest extends Request {
  user?: User;
}
