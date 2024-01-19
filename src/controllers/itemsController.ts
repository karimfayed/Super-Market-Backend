import { Model } from 'sequelize';
import { Items, getAllItemsInDatabase } from '../models/items';
import { ItemsReadDto } from '../dtos/items.dto';

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
