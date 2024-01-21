import { NextFunction, Request, Response } from 'express';
import { HttpBaseError } from '../errors/HttpBaseError';
import { HttpStatusCode } from '../constants/HttpStatusCode';
import { DefaultHttpErrorMessages } from '../constants/DefaultHttpErrorMessages';
import { isCustomMessage } from '../helpers/messageHelper';

export const errorHandler = (
  err: HttpBaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    'ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR'
  );
  console.error(req, next);
  console.log(
    '-----------------------------------------------------------------------------------------------------------'
  );
  console.log('ERROR Handler ');
  console.log(
    '-----------------------------------------------------------------------------------------------------------'
  );
  console.error(err.stack);
  const errorStatusCode = err.statusCode ? err.statusCode : HttpStatusCode.InternalServerError;

  const errorMessage = isCustomMessage(err.message)
    ? err.message
    : getErrorMessage(errorStatusCode);

  return res.status(errorStatusCode).json({ message: errorMessage });
};

function getErrorMessage(errorStatusCode: HttpStatusCode) {
  switch (errorStatusCode) {
    case HttpStatusCode.BadRequest:
      return DefaultHttpErrorMessages.BadRequestError;
    case HttpStatusCode.Unathorized:
      return DefaultHttpErrorMessages.UnathorizedError;
    case HttpStatusCode.Forbidden:
      return DefaultHttpErrorMessages.ForbiddenError;
    case HttpStatusCode.NotFound:
      return DefaultHttpErrorMessages.NotFoundError;
    default:
      return DefaultHttpErrorMessages.InternalServerError;
  }
}
