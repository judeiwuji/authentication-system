import BaseError from "./BaseError";

export default class NotFoundError extends BaseError {
  constructor(message?: string) {
    super("ENOTFOUND", message ? message : "Not found");
  }
}
