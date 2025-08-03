import { CustomerUser } from '../../domain/entities/CustomerUser';
import { CustomerModel } from '../../infrastructure/models/mongodb/CustomerModel';

export interface CustomerRepository {
  findAll: () => Promise<CustomerModel[]>;
  findById: (id: string) => Promise<CustomerModel | null>;
  findByEmail: (email: string) => Promise<CustomerModel | null>;
  create: (customer: CustomerUser) => Promise<CustomerModel>;
  update: (customer: CustomerUser) => Promise<CustomerModel | null>;
  delete: (id: string) => Promise<CustomerModel | null>;
}
