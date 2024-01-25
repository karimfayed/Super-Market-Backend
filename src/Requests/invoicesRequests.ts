import { Request } from 'express';
import { InvoiceReadDto } from '../dtos/invoices.dto';

export type GetAllInvoicesRequest = Request;

export type GetInvoiceRequest = Request<
  Pick<InvoiceReadDto, 'invoiceId'>,
  NonNullable<unknown>,
  NonNullable<unknown>
>;
