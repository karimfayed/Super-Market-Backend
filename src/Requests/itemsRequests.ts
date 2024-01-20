import { Request } from 'express';
import { ItemsReadDto, ItemsWriteDto } from '../dtos/items.dto';

export type GetAllItemsRequest = Request;

export type AddItemsRequest = Request<NonNullable<unknown>, NonNullable<unknown>, ItemsWriteDto[]>;

export type GetItemRequest = Request<
  Pick<ItemsReadDto, 'itemId'>,
  NonNullable<unknown>,
  NonNullable<unknown>
>;

export type UpdateItemRequest = Request<
  Pick<ItemsReadDto, 'itemId'>,
  NonNullable<unknown>,
  ItemsWriteDto
>;

export type DeleteItemRequest = Request<
  Pick<ItemsReadDto, 'itemId'>,
  NonNullable<unknown>,
  NonNullable<unknown>
>;
