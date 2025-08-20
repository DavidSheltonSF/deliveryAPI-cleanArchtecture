import { UpdateUserProfileDTO } from '../../../../presentation/dtos/UpdateUserProfileDTO';
import { UpdateCustomerResponse } from './response';

export interface UpdateUser {
  execute: (id: string, user: UpdateUserProfileDTO) => Promise<UpdateCustomerResponse>;
}
