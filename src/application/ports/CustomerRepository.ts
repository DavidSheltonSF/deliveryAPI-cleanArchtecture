import { CustomerUser } from '../../domain/entities/CustomerUser';
import { UserModel } from '../../infrastructure/models/mongodb/UserModel';

export interface CustomerRepository {
  findAll: () => Promise<UserModel[]>;
  findById: (id: string) => Promise<UserModel | null>;
  findByEmail: (email: string) => Promise<UserModel | null>;
  create: (customer: CustomerUser) => Promise<UserModel>;
  update: (customer: CustomerUser) => Promise<UserModel | null>;
  delete: (id: string) => Promise<UserModel | null>;
}
