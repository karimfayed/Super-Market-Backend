import { InvoiceStatus } from '../constants/InvoiceStatus';

export interface InvoiceReadDto {
  invoiceId: number;
  date: Date;
  status: InvoiceStatus;
  invoiceItems: InvoiceItemsDto[];
}

export interface InvoiceItemsDto {
  itemName: string;
  quantity: number;
  totalUnitPrice: number;
}

export type InvoiceWriteDto = Omit<InvoiceReadDto, 'InvoiceId'>;
