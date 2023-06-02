export default class BaseError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}
