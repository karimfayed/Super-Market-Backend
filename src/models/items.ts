import { Model, DataTypes, Op } from 'sequelize';
import { ItemsWriteDto } from '../dtos/items.dto';
import { NotFoundError } from '../errors/NotFoundError';
import { Connection } from './databaseConnection';

export class Items extends Model {
  public itemId!: number;
  public itemName!: string;
  public itemDescription!: string;
  public stockQuantity!: number;
  public price!: number;
}

Items.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    itemName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    itemDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    tableName: 'items',
    sequelize: Connection
  }
);

void Items.sync();

export const getAllItemsInDatabase = async (): Promise<Items[]> => {
  const items = await Items.findAll();
  return items;
};

export const addItemsInDatabase = async (items: ItemsWriteDto[]): Promise<Items[]> => {
  const newTransaction = await Connection.transaction();
  const newItems: Items[] = [];

  try {
    for (const itemWriteDTO of items) {
      const { itemName, itemDescription, stockQuantity, price } = itemWriteDTO;
      const item = new Items({
        itemName: itemName,
        itemDescription: itemDescription,
        stockQuantity: stockQuantity,
        price: price
      });

      await item.save({ transaction: newTransaction });
      newItems.push(item);
    }
    await newTransaction.commit();

    return newItems;
  } catch (error) {
    await newTransaction.rollback();
    throw error;
  }
};

export const getItemInDatabase = async (itemId: number) => {
  const item = await Items.findByPk(itemId);

  if (!item) throw new NotFoundError();

  return item;
};

export const updateItemInDatabase = async (itemId: number, updates: ItemsWriteDto) => {
  const updatedItem = await Items.update(updates, {
    where: {
      itemId
    }
  });
  return updatedItem;
};

export const deleteItemInDatabase = async (itemId: number) => {
  const newTransaction = await Connection.transaction();

  const deletedItem = await Items.update(
    { stockQuantity: 0 },
    {
      where: {
        itemId
      },
      transaction: newTransaction
    }
  );
  await newTransaction.commit();

  if (deletedItem[0] === 0) throw new NotFoundError();

  return deletedItem;
};

export const getItemsForIdsInDatabase = async (itemIds: number[]): Promise<Items[]> => {
  const invoiceItems = await Items.findAll({
    where: {
      itemId: {
        [Op.in]: itemIds
      }
    }
  });
  return invoiceItems;
};
