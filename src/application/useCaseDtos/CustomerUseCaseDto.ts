import { AddressUseCaseDto } from './AddressUseCaseDto';

export interface CustomerUseCaseDto {
  id?: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: AddressUseCaseDto;
}
