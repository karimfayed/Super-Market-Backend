import { NextFunction, Response, Router } from 'express';
import { AddUsersRequest, GetAllUsersRequest } from '../Requests/usersRequests';
import { addUsers, getAllUsers } from '../controllers/usersController';
import { validateAddUsersRequest } from '../middlewares/validateUsersRequest';

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

export default router;
