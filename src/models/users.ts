import { Model, DataTypes } from 'sequelize';
import { Connection } from './databaseConnection';

export class Users extends Model {
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public isActive!: number;
}

Users.init(
  {
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize: Connection
  }
);

void Users.sync();

export const getAllUsersInDatabase = async (): Promise<Users[]> => {
  const items = await Users.findAll();
  return items;
};
