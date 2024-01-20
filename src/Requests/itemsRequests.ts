import { Request } from 'express';
import { ItemsWriteDto } from '../dtos/items.dto';

export type GetAllItemsRequest = Request;

export type AddItemsRequest = Request<NonNullable<unknown>, NonNullable<unknown>, ItemsWriteDto[]>;
