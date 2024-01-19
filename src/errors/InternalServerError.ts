import { DefaultHttpErrorMessages } from '../constants/DefaultHttpErrorMessages';
import { HttpBaseError } from './HttpBaseError';
import { HttpStatusCode } from '../constants/HttpStatusCode';

export class InternalServerError extends HttpBaseError {
  constructor(message: string = DefaultHttpErrorMessages.InternalServerError) {
    super(HttpStatusCode.InternalServerError, message);
  }
}
