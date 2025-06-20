import { BaseUserDTO } from "./base-user-dto";

export interface CustomerDTO extends BaseUserDTO{
  cpf: string;
  phone: string;
  role: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}