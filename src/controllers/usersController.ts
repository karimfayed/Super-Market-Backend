import { Response } from 'express';
import { Model } from 'sequelize';
import {
  Users,
  addUsersInDatabase,
  deleteUserInDatabase,
  getAllUsersInDatabase,
  getUserInDatabase,
  updateUserInDatabase
} from '../models/users';
import { UsersDto } from '../dtos/users.dto';
import {
  createdResponseHandler,
  noContentResponseHandler,
  okResponseHandler
} from '../middlewares/responseHandlers';
import {
  DeleteUserRequest,
  GetUserInvoicesRequest,
  GetUserRequest,
  UpdateUserRequest
} from '../Requests/usersRequests';
import { Invoices, getAllUserInvoicesInDatabase } from '../models/invoices';
import { InvoiceItems, getAllInvoiceItemsForInvoicesInDatabase } from '../models/invoiceItems';
import { InvoiceReadDto } from '../dtos/invoices.dto';
import { getItemsForIdsInDatabase } from '../models/items';
import { getCurrentInvoiceItems } from '../helpers/invoiceHelper';

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

export const deleteUser = async (req: DeleteUserRequest, res: Response): Promise<void> => {
  const { email } = req.params;
  await deleteUserInDatabase(email);
  noContentResponseHandler(res);
};

export const getUserInvoices = async (
  req: GetUserInvoicesRequest,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  const invoices = await getAllUserInvoicesInDatabase(email);

  const invoiceIds = invoices.map((item: Model<Invoices>) => item.dataValues.invoiceId);

  const invoiceItems = await getAllInvoiceItemsForInvoicesInDatabase(invoiceIds);

  const itemIds = invoiceItems.map((item: Model<InvoiceItems>) => item.dataValues.itemId);

  const items = await getItemsForIdsInDatabase(itemIds);

  const responseDto: InvoiceReadDto[] = invoices.map((invoice: Model<Invoices>) => ({
    invoiceId: invoice.dataValues.invoiceId,
    date: invoice.dataValues.creationDate,
    status: invoice.dataValues.invoiceStatus,
    invoiceItems: getCurrentInvoiceItems(invoice.dataValues.invoiceId, invoiceItems, items)
  }));

  okResponseHandler(responseDto, res);
};
