import { AddressUseCaseDTO } from './AddressUseCaseDTO';

export interface UserUseCaseDTO {
  id?: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: AddressUseCaseDTO;
}
