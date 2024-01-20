import { Response } from 'express';
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
import {
  createdResponseHandler,
  noContentResponseHandler,
  okResponseHandler
} from '../middlewares/responseHandlers';

export const getAllItems = async (res: Response): Promise<void> => {
  const items = await getAllItemsInDatabase();

  const responseDto: ItemsReadDto[] = items.map((item: Model<Items>) => ({
    itemId: item.dataValues.itemId,
    itemName: item.dataValues.itemName,
    itemDescription: item.dataValues.itemDescription,
    stockQuantity: item.dataValues.stockQuantity,
    price: item.dataValues.price
  }));

  okResponseHandler(responseDto, res);
};

export const addItems = async (items: ItemsWriteDto[], res: Response): Promise<void> => {
  const itemsAdded = await addItemsInDatabase(items);

  const responseDto: ItemsReadDto[] = itemsAdded.map((item: Model<Items>) => ({
    itemId: (item as Items).itemId,
    itemName: item.dataValues.itemName,
    itemDescription: item.dataValues.itemDescription,
    stockQuantity: item.dataValues.stockQuantity,
    price: item.dataValues.price
  }));

  createdResponseHandler(responseDto, res);
};

export const getItem = async (req: GetItemRequest, res: Response): Promise<void> => {
  const { itemId } = req.params;

  const item = (await getItemInDatabase(itemId)) as Model<Items>;

  const responseDto: ItemsReadDto = {
    itemId: item.dataValues.itemId,
    itemName: item.dataValues.itemName,
    itemDescription: item.dataValues.itemDescription,
    stockQuantity: item.dataValues.stockQuantity,
    price: item.dataValues.price
  };

  okResponseHandler(responseDto, res);
};

export const updateItem = async (req: UpdateItemRequest, res: Response): Promise<void> => {
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

  okResponseHandler(responseDto, res);
};

export const deleteItem = async (req: DeleteItemRequest, res: Response): Promise<void> => {
  const { itemId } = req.params;
  await deleteItemInDatabase(itemId);
  noContentResponseHandler(res);
};
