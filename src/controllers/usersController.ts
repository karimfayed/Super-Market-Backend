import { Response } from 'express';
import { Model } from 'sequelize';
import { Users, getAllUsersInDatabase } from '../models/users';
import { UsersDto } from '../dtos/users.dto';
import { okResponseHandler } from '../middlewares/responseHandlers';

export const getAllUsers = async (res: Response): Promise<void> => {
  const items = await getAllUsersInDatabase();

  const responseDto: UsersDto[] = items.map((item: Model<Users>) => ({
    email: item.dataValues.email,
    firstName: item.dataValues.firstName,
    lastName: item.dataValues.lastName,
    isActive: item.dataValues.isActive
  }));

  okResponseHandler(responseDto, res);
};
