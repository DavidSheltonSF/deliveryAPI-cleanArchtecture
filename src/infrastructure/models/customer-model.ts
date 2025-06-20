import { BaseUserModel } from "./base-user-props";

export interface CustomerModel extends BaseUserModel {
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
