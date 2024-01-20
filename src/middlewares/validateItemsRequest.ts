import { Request, Response, NextFunction } from 'express';
import { ItemsWriteDto } from '../dtos/items.dto';
import { BadRequestError } from '../errors/BadRequestError';
import { ItemsErrorMessages } from '../constants/ItemsErrorMessages';
import { GetItemRequest } from '../Requests/itemsRequests';

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
    return next(error);
  }
  return next();
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

export const areRequiredFieldsPresent = (item: ItemsWriteDto) => {
  const { itemName, itemDescription, stockQuantity, price } = item;
  return itemName && itemDescription && stockQuantity && price ? true : false;
};

export const areFieldValuesValid = (item: ItemsWriteDto) => {
  const { itemName, itemDescription, stockQuantity, price } = item;
  return (
    typeof itemName === 'string' &&
    typeof itemDescription === 'string' &&
    typeof stockQuantity === 'number' &&
    Number.isInteger(stockQuantity) &&
    typeof price === 'number'
  );
};

export const validateGetItemRequest = (req: GetItemRequest, _res: Response, next: NextFunction) => {
  try {
    validateItemId(req);
  } catch (error) {
    return next(error);
  }
  return next();
};

function validateItemId(req: GetItemRequest) {
  const isValid = isItemIdValid(req);
  if (!isValid) throw new BadRequestError(ItemsErrorMessages.InvalidItemId);
}

function isItemIdValid(req: GetItemRequest) {
  const { itemId } = req.params;

  const parsedItemId = Number(itemId);

  return Number.isInteger(parsedItemId);
}
