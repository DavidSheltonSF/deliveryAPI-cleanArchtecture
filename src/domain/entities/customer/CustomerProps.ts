import { BaseUserProps } from '../base-user-props';
import { Address, Cpf, Name, Phone, Role } from '../value-objects';

export interface CustomerProps extends BaseUserProps {
  name: Name;
  cpf: Cpf;
  phone: Phone;
  role: Role;
  address: Address;
}
