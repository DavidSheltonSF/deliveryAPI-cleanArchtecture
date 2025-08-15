import { CreateCustomerDTO } from '../../../../presentation/dtos/CreateCustomerDTO';
import { CreateCustomerResponse } from './response';

export interface CreateUser {
  execute: (customerDTO: CreateCustomerDTO) => Promise<CreateCustomerResponse>;
}
