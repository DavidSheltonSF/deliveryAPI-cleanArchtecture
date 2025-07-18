export interface BankAccountDTO {
  holderName: string;
  cpf: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: string;
}

export interface AddressDTO {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AuthenticationDTO {
  password: string;
  sessionToken?: string;
}

export interface UserDTO {
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthday: string;
  role: string;
  address?: AddressDTO;
  bankAccount?: BankAccountDTO;
  authentication: AuthenticationDTO;
}
