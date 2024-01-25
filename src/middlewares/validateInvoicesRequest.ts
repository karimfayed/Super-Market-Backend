import { NextFunction, Response } from 'express';
import { GetInvoiceRequest } from '../Requests/invoicesRequests';
import { UsersErrorMessages } from '../constants/ErrorMessages';
import { BadRequestError } from '../errors/BadRequestError';
import { isInvoiceIdValid } from '../helpers/invoiceValidationHelper';

export const validateGetInvoiceRequest = (
  req: GetInvoiceRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    validateInvoiceId(req);
  } catch (error) {
    next(error);
  }
  next();
};

function validateInvoiceId(req: GetInvoiceRequest) {
  const isValid = isInvoiceIdValid(req);
  if (!isValid) throw new BadRequestError(UsersErrorMessages.InvalidEmail);
}
