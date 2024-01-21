import express from 'express';
import itemsRoutes from './routes/itemsRoutes';
import usersRoutes from './routes/usersRoutes';
import usersInvoices from './routes/invoicesRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

const port = 8000;

app.listen(port);

app.use(express.json());

app.use('/items', itemsRoutes);
app.use('/users', usersRoutes);
app.use('/invoices', usersInvoices);
app.use(errorHandler);
