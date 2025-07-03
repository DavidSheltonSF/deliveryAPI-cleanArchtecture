import { CustomerUser } from '../../domain/entities/user/customer/CustomerUser';
import { UserModel } from '../../infrastructure/models/mongodb/UserModel';
import { UserUseCaseDto } from '../useCaseDtos/UserUseCaseDto';

export interface UserRepository {
  findUserByEmail: (email: string) => Promise<UserModel | null>;
  add: (custumerData: CustomerUser) => Promise<Partial<UserModel>>;
}
