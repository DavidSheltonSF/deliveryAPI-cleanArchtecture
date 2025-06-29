import { BaseUserDTO } from './base-user-dto';

export interface CustomerDto extends BaseUserDTO {
  name: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
