import { BaseUserDTO } from './base-user-dto';

export interface BankAccountDto {
  holderName: string;
  cpf: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: string;
}

export interface AddressDto {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AuthenticationDto {
  password: string;
  sessionToken?: string;
}

export interface UserDto {
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthday: string;
  role: string;
  address?: AddressDto;
  bankAccount?: BankAccountDto;
  authentication: AuthenticationDto;
}
