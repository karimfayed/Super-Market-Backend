import { HttpStatusCode } from '../constants/HttpStatusCode';

export class HttpBaseError extends Error {
  readonly statusCode: HttpStatusCode;
  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}
