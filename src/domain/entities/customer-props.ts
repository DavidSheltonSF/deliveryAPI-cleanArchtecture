import { BaseUserProps } from './base-user-props';
import { Address, Cpf, Phone, Role } from './value-objects';

export interface CustomerProps extends BaseUserProps {
  cpf: Cpf;
  phone: Phone;
  role: Role;
  address: Address;
}
