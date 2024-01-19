import { NextFunction, Response, Router } from 'express';
import { getAllItems } from '../controllers/itemsController';
import { okResponseHandler } from '../middlewares/responseHandlers';

import { GetAllItemsRequest } from '../Requests/itemsRequests';

const router = Router();

router.get('/', async (_req: GetAllItemsRequest, res: Response, next: NextFunction) => {
  try {
    const responseDto = await getAllItems();
    okResponseHandler(responseDto, res);
  } catch (err) {
    return next(err);
  }
});

export default router;
