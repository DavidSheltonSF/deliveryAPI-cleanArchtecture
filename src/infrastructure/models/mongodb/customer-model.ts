import { AddressModel } from "./addressModel.ts";
import { BaseUserModel } from "./base-user-props";

export interface CustomerModel extends BaseUserModel {
  name: string
  cpf: string;
  phone: string;
  role: string;
  address: AddressModel;
}
