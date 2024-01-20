import { Request } from 'express';
import { UsersDto } from '../dtos/users.dto';

export type GetAllUsersRequest = Request;

export type AddUsersRequest = Request<NonNullable<unknown>, NonNullable<unknown>, UsersDto[]>;

export type GetUserRequest = Request<
  Pick<UsersDto, 'email'>,
  NonNullable<unknown>,
  NonNullable<unknown>
>;

export type UpdateUserRequest = Request<Pick<UsersDto, 'email'>, NonNullable<unknown>, UsersDto>;
