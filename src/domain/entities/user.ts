import { Authentication } from "./validators/_interfaces";
import { Address, BankInfo } from "./validators/_interfaces";
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId,
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: string
  address: Address,
  authentication: Authentication,
  bankInfo?: BankInfo
}

export class UserCast {
  /* Converts database documents into User type objects */
  static toUser (data: Record<string, any>): User {
    const {
        _id,
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
    } = data;

    return {
      _id,
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      bankInfo
    }
  }
}