import { Model } from 'sequelize';
import {
  Items,
  addItemsInDatabase,
  deleteItemInDatabase,
  getAllItemsInDatabase,
  getItemInDatabase,
  updateItemInDatabase
} from '../models/items';
import { ItemsReadDto, ItemsWriteDto } from '../dtos/items.dto';
import { DeleteItemRequest, GetItemRequest, UpdateItemRequest } from '../Requests/itemsRequests';

export const getAllItems = async (): Promise<ItemsReadDto[]> => {
  const items = await getAllItemsInDatabase();

  const responseDto: ItemsReadDto[] = items.map((item: Model<Items>) => ({
    itemId: item.dataValues.itemId,
    itemName: item.dataValues.itemName,
    itemDescription: item.dataValues.itemDescription,
    stockQuantity: item.dataValues.stockQuantity,
    price: item.dataValues.price
  }));

  return responseDto;
};

export const addItems = async (items: ItemsWriteDto[]): Promise<ItemsReadDto[]> => {
  const itemsAdded = await addItemsInDatabase(items);

  const responseDto: ItemsReadDto[] = itemsAdded.map((item: Model<Items>) => ({
    itemId: (item as Items).itemId,
    itemName: item.dataValues.itemName,
    itemDescription: item.dataValues.itemDescription,
    stockQuantity: item.dataValues.stockQuantity,
    price: item.dataValues.price
  }));
  return responseDto;
};

export const getItem = async (req: GetItemRequest): Promise<ItemsReadDto> => {
  const { itemId } = req.params;

  const item = (await getItemInDatabase(itemId)) as Model<Items>;
  console.log('item', item);

  const responseDto: ItemsReadDto = {
    itemId: item.dataValues.itemId,
    itemName: item.dataValues.itemName,
    itemDescription: item.dataValues.itemDescription,
    stockQuantity: item.dataValues.stockQuantity,
    price: item.dataValues.price
  };

  return responseDto;
};

export const updateItem = async (req: UpdateItemRequest): Promise<ItemsReadDto> => {
  const { itemId } = req.params;
  const { body: item } = req;

  const itemUpdates: ItemsWriteDto = {
    itemName: item.itemName,
    itemDescription: item.itemDescription,
    stockQuantity: item.stockQuantity,
    price: item.price
  };

  await updateItemInDatabase(itemId, itemUpdates);

  const responseDto: ItemsReadDto = {
    itemId: itemId,
    ...itemUpdates
  };

  return responseDto;
};

export const deleteItem = async (req: DeleteItemRequest): Promise<void> => {
  const { itemId } = req.params;
  await deleteItemInDatabase(itemId);
  return;
};
