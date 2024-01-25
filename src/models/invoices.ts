import { Model, DataTypes } from 'sequelize';
import { Connection } from './databaseConnection';
import { InvoiceStatus } from '../constants/InvoiceStatus';
import { NotFoundError } from '../errors/NotFoundError';

export class Invoices extends Model {
  public invoiceId!: number;
  public creationDate!: Date;
  public invoiceStatus!: InvoiceStatus;
  public email!: string;
}

Invoices.init(
  {
    invoiceId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    invoiceStatus: {
      type: DataTypes.ENUM(InvoiceStatus.Placed, InvoiceStatus.Delivered, InvoiceStatus.Cancelled),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'invoices',
    sequelize: Connection
  }
);

void Invoices.sync();

export const getAllInvoicesInDatabase = async (): Promise<Invoices[]> => {
  const invoices = await Invoices.findAll();
  return invoices;
};

export const getAllUserInvoicesInDatabase = async (email: string): Promise<Invoices[]> => {
  const invoices = await Invoices.findAll({
    where: {
      email
    }
  });
  return invoices;
};

export const getInvoicesInDatabase = async (invoiceId: number): Promise<Invoices> => {
  const invoices = await Invoices.findByPk(invoiceId);

  if (!invoices) throw new NotFoundError();

  return invoices;
};
