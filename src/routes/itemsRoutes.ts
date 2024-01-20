import { NextFunction, Response, Router } from 'express';
import {
  addItems,
  deleteItem,
  getAllItems,
  getItem,
  updateItem
} from '../controllers/itemsController';

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
    await getAllItems(res);
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/',
  validateAddItemsRequest,
  async (req: AddItemsRequest, res: Response, next: NextFunction) => {
    try {
      await addItems(req.body, res);
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
      await getItem(req, res);
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
      await updateItem(req, res);
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
      await deleteItem(req, res);
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
