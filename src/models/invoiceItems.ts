import { Model, DataTypes, Op } from 'sequelize';
import { Connection } from './databaseConnection';

export class InvoiceItems extends Model {
  public invoiceItemId!: number;
  public quantity!: number;
  public totalUnitPrice!: number;
  public itemId!: number;
  public invoiceId!: number;
}

InvoiceItems.init(
  {
    invoiceItemId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    totalUnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    itemId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    invoiceId: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    tableName: 'invoiceItems',
    sequelize: Connection
  }
);

void InvoiceItems.sync();

export const getAllInvoiceItemsInDatabase = async (): Promise<InvoiceItems[]> => {
  const invoiceItems = await InvoiceItems.findAll();
  return invoiceItems;
};

export const getAllInvoiceItemsForInvoicesInDatabase = async (
  invoiceIds: number[]
): Promise<InvoiceItems[]> => {
  const invoiceItems = await InvoiceItems.findAll({
    where: {
      invoiceId: {
        [Op.in]: invoiceIds
      }
    }
  });
  return invoiceItems;
};
