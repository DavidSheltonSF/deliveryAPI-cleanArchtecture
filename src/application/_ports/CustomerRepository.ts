import { CustomerUser } from '../../domain/entities/user/customer/CustomerUser';
import { CustomerModel } from '../../infrastructure/models/mongodb/CustomerModel';

export interface CustomerRepository {
  //findAll: () => Promise<UserModel[]>;
  //findById: (id: string) => Promise<UserModel | null>
  findByEmail: (email: string) => Promise<CustomerModel | null>;
  // add: (customer: CustomerUser) => Promise<UserModel>;
  // update: (id: string, customer: CustomerUser) => Promise<UserModel>;
  // delete: (id: string) => Promise<UserModel | null>
}
