import { DefaultHttpErrorMessages } from '../constants/DefaultHttpErrorMessages';
import { HttpBaseError } from './HttpBaseError';
import { HttpStatusCode } from '../constants/HttpStatusCode';

export class BadRequestError extends HttpBaseError {
  constructor(message: string = DefaultHttpErrorMessages.BadRequestError) {
    super(HttpStatusCode.BadRequest, message);
  }
}
