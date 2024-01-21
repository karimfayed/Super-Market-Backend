import { NextFunction, Response, Router } from 'express';
import { getAllInvoices } from '../controllers/invoicesController';
import { GetAllInvoicesRequest } from '../Requests/invoicesRequests';

const router = Router();

router.get('/', async (_req: GetAllInvoicesRequest, res: Response, next: NextFunction) => {
  try {
    await getAllInvoices(res);
  } catch (err) {
    return next(err);
  }
});

export default router;
