import { BaseUserProps } from "./base-user-props";

export interface CustomerProps extends BaseUserProps {
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