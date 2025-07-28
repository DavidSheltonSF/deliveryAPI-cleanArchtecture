import { Hasher } from '../../../../domain/contracts/Hasher';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { CreateCustomerResponse } from './response';

export interface CreateUser {
  execute: (customerDTO: CreateUserDTO, hasher: Hasher) => Promise<CreateCustomerResponse>;
}
