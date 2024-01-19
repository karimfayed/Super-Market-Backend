import { DefaultHttpErrorMessages } from '../constants/DefaultHttpErrorMessages';
import { HttpBaseError } from './HttpBaseError';
import { HttpStatusCode } from '../constants/HttpStatusCode';

export class ForbiddenError extends HttpBaseError {
  constructor(message: string = DefaultHttpErrorMessages.ForbiddenError) {
    super(HttpStatusCode.Forbidden, message);
  }
}
