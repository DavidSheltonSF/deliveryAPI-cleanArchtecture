import { PaymentMethod } from "./validators/_enums";
import { PaymentInfo } from "./validators/_interfaces";
import { Authentication } from "./validators/_interfaces";
import { Address } from "./validators/_interfaces";

export interface User {
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: string
  address: Address,
  authentication: Authentication,
  bankInfo?: {
    paymentMethod: PaymentMethod,
    paymentInfo: PaymentInfo
  }
}

export class UserCast {
  /* Converts database documents into User type objects */
  static toUser (data: Record<string, any>): User {
    const {
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