import { NextFunction, Response, Router } from 'express';
import { GetAllUsersRequest } from '../Requests/usersRequests';
import { getAllUsers } from '../controllers/usersController';

const router = Router();

router.get('/', async (_req: GetAllUsersRequest, res: Response, next: NextFunction) => {
  try {
    await getAllUsers(res);
  } catch (err) {
    return next(err);
  }
});

export default router;
