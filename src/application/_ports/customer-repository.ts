import { CustomerProps } from '../../domain/entities/customer-props';

export interface CustomerRepository {
  add: (custumerData: CustomerProps) => Promise<any>;
}