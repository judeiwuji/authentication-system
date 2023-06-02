import BaseError from "./BaseError";

export class SessionNotFoundError extends BaseError {
  constructor(message: string) {
    super("SessionNotFound", message);
  }
}
