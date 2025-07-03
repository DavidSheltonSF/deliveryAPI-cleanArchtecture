import { Customer } from '../../domain/entities/user/customer/Customer';
import { UserModel } from '../../infrastructure/models/mongodb/UserModel';
import { UserUseCaseDto } from '../useCaseDtos/UserUseCaseDto';

export interface UserRepository {
  findCustomerByEmail: (email: string) => Promise<UserModel | null>;
  add: (custumerData: Customer) => Promise<Partial<UserModel>>;
}
