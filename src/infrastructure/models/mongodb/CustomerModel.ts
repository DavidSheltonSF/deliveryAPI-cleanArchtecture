import { AddressModel } from './addressModel.ts.js';
import { BaseUserModel } from './BaseUserModel.js';

export interface CustomerModel extends BaseUserModel {
  name: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: string;
  address: AddressModel;
}
