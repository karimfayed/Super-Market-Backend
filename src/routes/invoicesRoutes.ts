import { NextFunction, Response, Router } from 'express';
import { getAllInvoices, getInvoice } from '../controllers/invoicesController';
import { GetAllInvoicesRequest, GetInvoiceRequest } from '../Requests/invoicesRequests';
import { validateGetInvoiceRequest } from '../middlewares/validateInvoicesRequest';

const router = Router();

router.get('/', async (_req: GetAllInvoicesRequest, res: Response, next: NextFunction) => {
  try {
    await getAllInvoices(res);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:invoiceId',
  validateGetInvoiceRequest,
  async (req: GetInvoiceRequest, res: Response, next: NextFunction) => {
    try {
      await getInvoice(req, res);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
