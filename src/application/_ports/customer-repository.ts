import { Customer } from '../../domain/entities/customer/Customer';
import { CustomerModel } from '../../infrastructure/models/mongodb/CustomerModel';
import { CustomerUseCaseDto } from '../useCaseDtos/CustomerUseCaseDto';

export interface CustomerRepository {
  findCustomerByEmail: (email: string) => Promise<CustomerModel | null>;
  add: (custumerData: Customer) => Promise<Partial<CustomerModel>>;
}