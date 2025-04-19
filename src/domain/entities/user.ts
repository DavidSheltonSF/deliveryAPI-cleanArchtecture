import { AddressProps, BankInfoProps, AuthenticationProps } from "./validators/_interfaces";
import { ObjectId } from 'mongodb';

export interface UserProps {
  _id: ObjectId | null,
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: string
  address?: AddressProps,
  authentication: AuthenticationProps,
  bankInfo?: BankInfoProps
}

export class UserMapper {
  /* Converts database documents into User type objects */
  static toUser (data: Record<string, any>): UserProps {
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