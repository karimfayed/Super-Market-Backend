import { GetInvoiceRequest } from '../Requests/invoicesRequests';

export function isInvoiceIdValid(req: GetInvoiceRequest) {
  const { invoiceId } = req.params;

  const parsedItemId = Number(invoiceId);

  return Number.isInteger(parsedItemId);
}
