import { Model, DataTypes } from 'sequelize';
import { Connection } from './databaseConnection';
import { UsersDto } from '../dtos/users.dto';

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
  const items = await Users.findAll({
    where: {
      isActive: 1
    }
  });
  return items;
};

export const addUsersInDatabase = async (users: UsersDto[]): Promise<Users[]> => {
  const newTransaction = await Connection.transaction();
  const newItems: Users[] = [];

  try {
    for (const userDto of users) {
      const { email, firstName, lastName } = userDto;
      const user = new Users({
        email: email,
        firstName: firstName,
        lastName: lastName,
        isActive: 1
      });

      await user.save({ transaction: newTransaction });
      newItems.push(user);
    }
    await newTransaction.commit();

    return newItems;
  } catch (error) {
    await newTransaction.rollback();
    throw error;
  }
};
