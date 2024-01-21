import { Model } from 'sequelize';
import { InvoiceItemsDto } from '../dtos/invoices.dto';
import { InvoiceItems } from '../models/invoiceItems';
import { Items } from '../models/items';

export function getCurrentInvoiceItems(
  invoiceId: number,
  invoiceItems: InvoiceItems[],
  items: Items[]
): InvoiceItemsDto[] {
  const filteredInvoiceItems = invoiceItems.filter(
    (item: Model<InvoiceItems>) => item.dataValues.invoiceId === invoiceId
  );

  const invoiceItemsDto: InvoiceItemsDto[] = filteredInvoiceItems
    .map((invoiceItemIterator: Model<InvoiceItems>) => {
      const matchedItem = items.find(
        (item: Model<Items>) => item.dataValues.itemId === invoiceItemIterator.dataValues.itemId
      );
      if (matchedItem) {
        return {
          itemName: (matchedItem as Model<Items>).dataValues.itemName,
          quantity: invoiceItemIterator.dataValues.quantity,
          totalUnitPrice: invoiceItemIterator.dataValues.totalUnitPrice
        };
      }

      return null;
    })
    .filter((item) => item !== null) as InvoiceItemsDto[];

  return invoiceItemsDto;
}
