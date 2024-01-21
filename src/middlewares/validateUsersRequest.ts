import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { UsersErrorMessages } from '../constants/ItemsErrorMessages';
import {
  areFieldValuesValid,
  areRequiredFieldsPresent,
  isEmailValid
} from '../helpers/userValidation';
import { UsersDto } from '../dtos/users.dto';
import {
  DeleteUserRequest,
  GetUserInvoicesRequest,
  GetUserRequest,
  UpdateUserRequest
} from '../Requests/usersRequests';

export const validateAddUsersRequest = (
  req: Request<NonNullable<unknown>, NonNullable<unknown>, UsersDto[]>,
  _res: Response,
  next: NextFunction
) => {
  const { body: users } = req;
  try {
    validateRequiredFields(users);
    validateFieldValues(users);
  } catch (error) {
    return next(error);
  }
  return next();
};

export const validateRequiredFields = (items: UsersDto[]) => {
  items.map((user: UsersDto) => {
    const areValid = areRequiredFieldsPresent(user);
    if (!areValid) throw new BadRequestError(UsersErrorMessages.RequiredFieldsMissing);
  });
};

export const validateFieldValues = (users: UsersDto[]) => {
  users.map((item: UsersDto) => {
    const areValid = areFieldValuesValid(item);
    if (!areValid) throw new BadRequestError(UsersErrorMessages.InvalidFieldValues);
  });
};

export const validateGetUserRequest = (req: GetUserRequest, _res: Response, next: NextFunction) => {
  try {
    validateUserEmail(req);
  } catch (error) {
    return next(error);
  }
  return next();
};

function validateUserEmail(req: GetUserRequest) {
  const isValid = isEmailValid(req);
  if (!isValid) throw new BadRequestError(UsersErrorMessages.InvalidItemId);
}

export const validateUpdateUserRequest = (
  req: UpdateUserRequest,
  _res: Response,
  next: NextFunction
) => {
  const { body: user } = req;
  try {
    validateUserEmail(req as GetUserRequest);
    validateRequiredFields([user]);
  } catch (error) {
    return next(error);
  }
  return next();
};

export const validateDeleteUserRequest = (
  req: DeleteUserRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    validateUserEmail(req as GetUserRequest);
  } catch (error) {
    return next(error);
  }
  return next();
};

export const validateGetUserInvoicesRequest = (
  req: GetUserInvoicesRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    validateUserEmail(req);
  } catch (error) {
    return next(error);
  }
  return next();
};
