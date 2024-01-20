import { Response } from 'express';
import { Model } from 'sequelize';
import {
  Users,
  addUsersInDatabase,
  getAllUsersInDatabase,
  getUserInDatabase,
  updateUserInDatabase
} from '../models/users';
import { UsersDto } from '../dtos/users.dto';
import { createdResponseHandler, okResponseHandler } from '../middlewares/responseHandlers';
import { GetUserRequest, UpdateUserRequest } from '../Requests/usersRequests';

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

export const getUser = async (req: GetUserRequest, res: Response): Promise<void> => {
  const { email } = req.params;

  const item = (await getUserInDatabase(email)) as Model<Users>;

  const responseDto: UsersDto = {
    email: item.dataValues.email,
    firstName: item.dataValues.firstName,
    lastName: item.dataValues.lastName
  };

  okResponseHandler(responseDto, res);
};

export const updateUser = async (req: UpdateUserRequest, res: Response): Promise<void> => {
  const { email } = req.params;
  const { body: user } = req;

  const itemUpdates: UsersDto = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };

  await updateUserInDatabase(email, itemUpdates);

  const responseDto: UsersDto = {
    ...itemUpdates
  };

  okResponseHandler(responseDto, res);
};
