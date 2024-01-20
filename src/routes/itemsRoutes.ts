import { NextFunction, Response, Router } from 'express';
import {
  addItems,
  deleteItem,
  getAllItems,
  getItem,
  updateItem
} from '../controllers/itemsController';
import {
  createdResponseHandler,
  noContentResponseHandler,
  okResponseHandler
} from '../middlewares/responseHandlers';

import {
  AddItemsRequest,
  DeleteItemRequest,
  GetAllItemsRequest,
  GetItemRequest,
  UpdateItemRequest
} from '../Requests/itemsRequests';
import {
  validateAddItemsRequest,
  validateDeleteItemRequest,
  validateGetItemRequest,
  validateUpdateItemRequest
} from '../middlewares/validateItemsRequest';

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

router.get(
  '/:itemId',
  validateGetItemRequest,
  async (req: GetItemRequest, res: Response, next: NextFunction) => {
    try {
      const responseDto = await getItem(req);
      okResponseHandler(responseDto, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.put(
  '/:itemId',
  validateUpdateItemRequest,
  async (req: UpdateItemRequest, res: Response, next: NextFunction) => {
    try {
      const responseDto = await updateItem(req);
      okResponseHandler(responseDto, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.delete(
  '/:itemId',
  validateDeleteItemRequest,
  async (req: DeleteItemRequest, res: Response, next: NextFunction) => {
    try {
      await deleteItem(req);
      noContentResponseHandler(res);
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
