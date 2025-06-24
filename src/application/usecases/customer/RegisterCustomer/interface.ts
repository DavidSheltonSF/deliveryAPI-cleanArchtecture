import { CustomerProps } from '../../../../domain/entities/customer/CustomerProps';
import { RegisterCustomerResponse } from './response';

export interface RegisterCustomer {
  execute: (customer: CustomerProps) => Promise<RegisterCustomerResponse>;
}
