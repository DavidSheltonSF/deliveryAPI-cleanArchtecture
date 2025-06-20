import { BaseUserProps } from "./base-user-props";
import { Address, Cpf, Phone, Role } from "./validation";

export interface CustomerProps extends BaseUserProps {
  cpf: Cpf;
  phone: Phone;
  role: Role;
  address: Address;
}