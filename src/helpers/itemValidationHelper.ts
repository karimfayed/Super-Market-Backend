import { GetItemRequest } from 'src/Requests/itemsRequests';
import { ItemsWriteDto } from '../dtos/items.dto';

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

export function isItemIdValid(req: GetItemRequest) {
  const { itemId } = req.params;

  const parsedItemId = Number(itemId);

  return Number.isInteger(parsedItemId);
}
