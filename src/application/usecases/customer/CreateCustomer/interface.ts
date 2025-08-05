import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { CreateCustomerResponse } from './response';

export interface CreateUser {
  execute: (customerDTO: CreateUserDTO) => Promise<CreateCustomerResponse>;
}
