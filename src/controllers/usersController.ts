import { Response } from 'express';
import { Model } from 'sequelize';
import { Users, addUsersInDatabase, getAllUsersInDatabase } from '../models/users';
import { UsersDto } from '../dtos/users.dto';
import { createdResponseHandler, okResponseHandler } from '../middlewares/responseHandlers';

export const getAllUsers = async (res: Response): Promise<void> => {
  const items = await getAllUsersInDatabase();

  const responseDto: UsersDto[] = items.map((item: Model<Users>) => ({
    email: item.dataValues.email,
    firstName: item.dataValues.firstName,
    lastName: item.dataValues.lastName
  }));

  okResponseHandler(responseDto, res);
};

export const addUsers = async (users: UsersDto[], res: Response): Promise<void> => {
  const usersAdded = await addUsersInDatabase(users);

  const responseDto: UsersDto[] = usersAdded.map((item: Model<Users>) => ({
    email: item.dataValues.email,
    firstName: item.dataValues.firstName,
    lastName: item.dataValues.lastName
  }));

  createdResponseHandler(responseDto, res);
};
