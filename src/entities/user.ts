import { PaymentMethod } from "./validators/_enums";


interface PaymentInfo {
  holderName: string,
  cardNumber?: string,
  expiryDate?: string,
  cvv?: string
  pix_key?: string,
  bankAccount?: {
    bankName: string,
    accountNumber: string,
  }
}

interface Authentication {
  password: string,
  salt?: { type: String, select: false },
  sesstionToken?: { type: String, select: false }
}

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