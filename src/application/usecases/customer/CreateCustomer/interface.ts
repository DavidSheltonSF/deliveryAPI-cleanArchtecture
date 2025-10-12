import { UserDTO } from '../../../../presentation/dtos/UserDTO';
import { CreateCustomerResponse } from './response';

export interface CreateUser {
  execute: (user: UserDTO) => Promise<CreateCustomerResponse>;
}
