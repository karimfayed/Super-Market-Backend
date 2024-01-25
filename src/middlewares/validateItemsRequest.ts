import { Request, Response, NextFunction } from 'express';
import { ItemsWriteDto } from '../dtos/items.dto';
import { BadRequestError } from '../errors/BadRequestError';
import { ItemsErrorMessages } from '../constants/ErrorMessages';
import { DeleteItemRequest, GetItemRequest, UpdateItemRequest } from '../Requests/itemsRequests';
import {
  areFieldValuesValid,
  areRequiredFieldsPresent,
  isItemIdValid
} from '../helpers/itemValidationHelper';

export const validateAddItemsRequest = (
  req: Request<NonNullable<unknown>, NonNullable<unknown>, ItemsWriteDto[]>,
  _res: Response,
  next: NextFunction
) => {
  const { body: items } = req;
  try {
    validateRequiredFields(items);
    validateFieldValues(items);
  } catch (error) {
    next(error);
  }
  next();
};

export const validateRequiredFields = (items: ItemsWriteDto[]) => {
  items.map((item: ItemsWriteDto) => {
    const areValid = areRequiredFieldsPresent(item);
    if (!areValid) throw new BadRequestError(ItemsErrorMessages.RequiredFieldsMissing);
  });
};

export const validateFieldValues = (items: ItemsWriteDto[]) => {
  items.map((item: ItemsWriteDto) => {
    const areValid = areFieldValuesValid(item);
    if (!areValid) throw new BadRequestError(ItemsErrorMessages.InvalidFieldValues);
  });
};

export const validateGetItemRequest = (req: GetItemRequest, _res: Response, next: NextFunction) => {
  try {
    validateItemId(req);
  } catch (error) {
    next(error);
  }
  next();
};

function validateItemId(req: GetItemRequest) {
  const isValid = isItemIdValid(req);
  if (!isValid) throw new BadRequestError(ItemsErrorMessages.InvalidItemId);
}

export const validateUpdateItemRequest = (
  req: UpdateItemRequest,
  _res: Response,
  next: NextFunction
) => {
  const { body: items } = req;
  try {
    validateItemId(req as GetItemRequest);
    validateRequiredFields([items]);
  } catch (error) {
    next(error);
  }
  next();
};

export const validateDeleteItemRequest = (
  req: DeleteItemRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    validateItemId(req as GetItemRequest);
  } catch (error) {
    next(error);
  }
  next();
};
