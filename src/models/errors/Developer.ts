import BaseError from "./BaseError";

export class DeveloperCreateError extends BaseError {
  constructor(message: string) {
    super("DeveloperCreate", message);
  }
}

export class DeveloperNotFoundError extends BaseError {
  constructor(message: string) {
    super("DeveloperNotFound", message);
  }
}
