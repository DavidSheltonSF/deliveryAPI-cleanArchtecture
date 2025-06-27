import { BaseUserProps } from '../base-user-props';
import { Address, Cpf, Name, Phone, Role, Birthday } from '../value-objects';

export interface CustomerProps extends BaseUserProps {
  name: Name;
  cpf: Cpf;
  phone: Phone;
  role: Role;
  birthDay: Birthday
  address: Address;
}
