import { DefaultHttpErrorMessages } from '../constants/DefaultHttpErrorMessages';
import { HttpBaseError } from './HttpBaseError';
import { HttpStatusCode } from '../constants/HttpStatusCode';

export class NotFoundError extends HttpBaseError {
  constructor(message: string = DefaultHttpErrorMessages.NotFoundError) {
    super(HttpStatusCode.NotFound, message);
  }
}
