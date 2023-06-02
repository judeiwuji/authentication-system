import BaseError from "./BaseError";

export class ClientAppError extends BaseError {
  constructor(message: string) {
    super("ECREATEAPP", message);
  }
}

export class ClientAppNotFoundError extends BaseError {
  constructor(message: string) {
    super("EAPPNOTFOUND", message);
  }
}

export class ClientAppAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super("EAPPALREADYEXISTS", message);
  }
}
