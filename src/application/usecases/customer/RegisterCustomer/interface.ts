import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { CreateUserResponse } from './response';

export interface CreateUser {
  execute: (customerDTO: CreateUserDTO) => Promise<CreateUserResponse>;
}
