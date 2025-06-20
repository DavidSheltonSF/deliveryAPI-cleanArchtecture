import { CustomerDTO } from '../../../../presentation/dtos/custumer-dto';
import { RegisterCustomerResponse } from './response';

export interface RegisterCustomer {
  execute: (customer: CustomerDTO) => Promise<RegisterCustomerResponse>;
}
