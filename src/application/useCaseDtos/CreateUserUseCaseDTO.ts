import { AddressUseCaseDTO } from './AddressUseCaseDTO';

export interface CreateUserUseCaseDTO {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: AddressUseCaseDTO;
  createdAt: string;
}
