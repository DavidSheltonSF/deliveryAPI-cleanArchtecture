export interface Address {
  street: string,
  city: string,
  state: string,
  zipCode: string
}

export interface PaymentInfo {
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

export interface Authentication {
  password: string,
  salt?: { type: String, select: false },
  sesstionToken?: { type: String, select: false }
}