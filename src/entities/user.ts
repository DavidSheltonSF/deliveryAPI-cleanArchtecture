import { PaymentMethod } from "./validators/_enums";
import { PaymentInfo } from "./validators/_interfaces";
import { Authentication } from "./validators/_interfaces";

export interface User {
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: string
  address: {
    street: string,
    city: string,
    state: string,
    zipCode: string
  },
  authentication: Authentication,
  bankInfo?: {
    paymentMethod: PaymentMethod,
    paymentInfo: PaymentInfo
  }
}