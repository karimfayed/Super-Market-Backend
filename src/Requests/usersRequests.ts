import { Request } from 'express';
import { UsersDto } from '../dtos/users.dto';

export type GetAllUsersRequest = Request;

export type AddUsersRequest = Request<NonNullable<unknown>, NonNullable<unknown>, UsersDto[]>;
