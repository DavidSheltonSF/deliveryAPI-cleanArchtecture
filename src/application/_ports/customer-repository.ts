import { Customer } from '../../domain/entities/customer/Customer';
import { CustomerUseCaseDto } from '../useCaseDtos/CustomerUseCaseDto';

export interface CustomerRepository {
  findCustomerByEmail: (email: string) => Promise<CustomerUseCaseDto>
  add: (custumerData: Customer) => Promise<any>;
}