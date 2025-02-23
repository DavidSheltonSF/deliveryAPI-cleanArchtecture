import { UserRole } from "./validators/role/role";
import { UserAddress } from "./validators/address/address";

enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX_KEY = 'pix_key',
  BANK_TRANSFER = 'bank_transfer'
}

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
  salt: { type: String, select: false },
  sesstionToken: { type: String, select: false }
}

export interface User {
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: UserRole,
  address: UserAddress,
  authentication: Authentication,
  bankInfo?: {
    paymentMethod: PaymentMethod,
    paymentInfo: PaymentInfo
  }
}