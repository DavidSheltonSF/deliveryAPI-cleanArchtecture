import { AddressUseCaseDto } from './AddressUseCaseDto';

export interface CustomerUseCaseDto {
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  address: AddressUseCaseDto;
}
