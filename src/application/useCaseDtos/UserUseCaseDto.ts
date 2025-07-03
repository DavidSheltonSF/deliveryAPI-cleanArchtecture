import { AddressUseCaseDto } from './AddressUseCaseDto';

export interface UserUseCaseDto {
  id?: string;
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  address: AddressUseCaseDto;
}
