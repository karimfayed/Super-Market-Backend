/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Sequelize, Model, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

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
  public itemId!: string;
  public itemName!: string;
  public itemDescription!: string;
  public stockQuantity!: number;
  public price!: number;
}

Items.init(
  {
    itemId: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
      primaryKey: true
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
