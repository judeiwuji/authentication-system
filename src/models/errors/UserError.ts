import BaseError from "./BaseError";

export class UserCreateError extends BaseError {
  constructor(message: string) {
    super("UserCreationFailed", message);
  }
}

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super("UserAlreadyExists", message);
  }
}

export class UserNotFoundError extends BaseError {
  constructor(message: string) {
    super("UserNotFound", message);
  }
}

export class UserSecretNotFoundError extends BaseError {
  constructor(message: string) {
    super("UserSecretNotFound", message);
  }
}
