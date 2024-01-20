import { NextFunction, Response, Router } from 'express';
import { addItems, getAllItems } from '../controllers/itemsController';
import { createdResponseHandler, okResponseHandler } from '../middlewares/responseHandlers';

import { AddItemsRequest, GetAllItemsRequest } from '../Requests/itemsRequests';
import { validateAddItemsRequest } from '../middlewares/validateItemsRequest';

const router = Router();

router.get('/', async (_req: GetAllItemsRequest, res: Response, next: NextFunction) => {
  try {
    const responseDto = await getAllItems();
    okResponseHandler(responseDto, res);
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/',
  validateAddItemsRequest,
  async (req: AddItemsRequest, res: Response, next: NextFunction) => {
    try {
      const addedItems = await addItems(req.body);
      createdResponseHandler(addedItems, res);
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
