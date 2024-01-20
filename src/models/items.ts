/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Sequelize, Model, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { ItemsWriteDto } from '../dtos/items.dto';
import { NotFoundError } from '../errors/NotFoundError';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
);

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
      type: DataTypes.STRING(13),
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
    sequelize
  }
);

void Items.sync();

export const getAllItemsInDatabase = async (): Promise<Items[]> => {
  const items = await Items.findAll();
  return items;
};

export const addItemsInDatabase = async (items: ItemsWriteDto[]): Promise<Items[]> => {
  const newTransaction = await sequelize.transaction();
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
