import { Response } from 'express';
import { HttpStatusCode } from '../constants/HttpStatusCode';

export const createdResponseHandler = <T>(data: T, res: Response) => {
  res.status(HttpStatusCode.Created).send(data);
};

export const okResponseHandler = <T>(data: T, res: Response): void => {
  res.status(HttpStatusCode.OK).send(data);
};

export const noContentResponseHandler = (res: Response) => {
  res.status(HttpStatusCode.NoContent).send();
};
