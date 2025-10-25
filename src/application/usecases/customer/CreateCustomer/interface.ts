import { CustomerDTO } from '../../../../presentation/dtos/CustomerDTO';
import { CreateCustomerResponse } from './response';

export interface CreateUser {
  execute: (user: CustomerDTO) => Promise<CreateCustomerResponse>;
}
