import { NextFunction, Response, Router } from 'express';
import {
  AddUsersRequest,
  DeleteUserRequest,
  GetAllUsersRequest,
  GetUserInvoicesRequest,
  GetUserRequest,
  UpdateUserRequest
} from '../Requests/usersRequests';
import {
  addUsers,
  deleteUser,
  getAllUsers,
  getUser,
  getUserInvoices,
  updateUser
} from '../controllers/usersController';
import {
  validateAddUsersRequest,
  validateDeleteUserRequest,
  validateGetUserInvoicesRequest,
  validateGetUserRequest,
  validateUpdateUserRequest
} from '../middlewares/validateUsersRequest';

const router = Router();

router.get('/', async (_req: GetAllUsersRequest, res: Response, next: NextFunction) => {
  try {
    await getAllUsers(res);
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/',
  validateAddUsersRequest,
  async (req: AddUsersRequest, res: Response, next: NextFunction) => {
    try {
      await addUsers(req.body, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  '/:email',
  validateGetUserRequest,
  async (req: GetUserRequest, res: Response, next: NextFunction) => {
    try {
      await getUser(req, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.put(
  '/:email',
  validateUpdateUserRequest,
  async (req: UpdateUserRequest, res: Response, next: NextFunction) => {
    try {
      await updateUser(req, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.delete(
  '/:email',
  validateDeleteUserRequest,
  async (req: DeleteUserRequest, res: Response, next: NextFunction) => {
    try {
      await deleteUser(req, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  '/:email/invoices',
  validateGetUserInvoicesRequest,
  async (req: GetUserInvoicesRequest, res: Response, next: NextFunction) => {
    try {
      await getUserInvoices(req, res);
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
