import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { ItemsErrorMessages } from '../constants/ItemsErrorMessages';
import { areFieldValuesValid, areRequiredFieldsPresent } from '../helpers/userValidation';
import { UsersDto } from 'src/dtos/users.dto';

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
    if (!areValid) throw new BadRequestError(ItemsErrorMessages.RequiredFieldsMissing);
  });
};

export const validateFieldValues = (users: UsersDto[]) => {
  users.map((item: UsersDto) => {
    const areValid = areFieldValuesValid(item);
    if (!areValid) throw new BadRequestError(ItemsErrorMessages.InvalidFieldValues);
  });
};
