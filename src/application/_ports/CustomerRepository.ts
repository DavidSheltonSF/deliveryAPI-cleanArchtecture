import { CustomerUser } from '../../domain/entities/CustomerUser';
import { CustomerModel } from '../../infrastructure/models/mongodb/CustomerModel';

export interface CustomerRepository {
  findAll: () => Promise<CustomerModel[]>;
  findById: (id: string) => Promise<CustomerModel | null>;
  findByEmail: (email: string) => Promise<CustomerModel | null>;
  add: (customer: CustomerUser) => Promise<CustomerModel>;
  update: (id: string, customer: CustomerUser) => Promise<CustomerModel>;
  delete: (id: string) => Promise<CustomerModel | null>;
}
