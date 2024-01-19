import { DefaultHttpErrorMessages } from '../constants/DefaultHttpErrorMessages';
import { HttpBaseError } from './HttpBaseError';
import { HttpStatusCode } from '../constants/HttpStatusCode';

export class UnathorizedError extends HttpBaseError {
  constructor(message: string = DefaultHttpErrorMessages.UnathorizedError) {
    super(HttpStatusCode.Unathorized, message);
  }
}
