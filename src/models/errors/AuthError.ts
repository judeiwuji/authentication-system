import BaseError from "./BaseError";

export class PasswordNotMatchError extends BaseError {
  constructor(message: string) {
    super("PasswordNotMatch", message);
  }
}

export class UnknownUserError extends BaseError {
  constructor(message: string) {
    super("EUNKNOWNUSER", message);
  }
}
