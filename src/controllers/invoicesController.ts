import { Response } from 'express';
import { Model } from 'sequelize';
import { Invoices, getAllInvoicesInDatabase } from '../models/invoices';
import { okResponseHandler } from '../middlewares/responseHandlers';
import { InvoiceItems, getAllInvoiceItemsForInvoicesInDatabase } from '../models/invoiceItems';
import { InvoiceReadDto } from '../dtos/invoices.dto';
import { getItemsForIdsInDatabase } from '../models/items';
import { getCurrentInvoiceItems } from '../helpers/invoiceHelper';

export const getAllInvoices = async (res: Response): Promise<void> => {
  const invoices = await getAllInvoicesInDatabase();

  const invoiceIds = invoices.map((item: Model<Invoices>) => item.dataValues.invoiceId);

  const invoiceItems = await getAllInvoiceItemsForInvoicesInDatabase(invoiceIds);

  const itemIds = invoiceItems.map((item: Model<InvoiceItems>) => item.dataValues.itemId);

  const items = await getItemsForIdsInDatabase(itemIds);

  const responseDto: InvoiceReadDto[] = invoices.map((invoice: Model<Invoices>) => ({
    invoiceId: invoice.dataValues.invoiceId,
    date: invoice.dataValues.creationDate,
    status: invoice.dataValues.invoiceStatus,
    invoiceItems: getCurrentInvoiceItems(invoice.dataValues.invoiceId, invoiceItems, items)
  }));

  okResponseHandler(responseDto, res);
};
