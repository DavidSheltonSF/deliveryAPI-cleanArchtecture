import { CustomerDTO } from '../../../../presentation/dtos/custumer-dto';
import { RegisterUserResponse } from './response';

export interface RegisterUser {
  execute: (user: CustomerDTO) => Promise<RegisterUserResponse>;
}
