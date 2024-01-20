import { Model } from 'sequelize';
import { Items, addItemsInDatabase, getAllItemsInDatabase } from '../models/items';
import { ItemsReadDto, ItemsWriteDto } from '../dtos/items.dto';

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
    price: Number(item.dataValues.price.toFixed(2))
  }));
  return responseDto;
};
