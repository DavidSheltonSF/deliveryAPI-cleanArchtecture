export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentInfoProps {
  holderName: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  pix_key?: string;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
  };
}

export interface BankInfoProps {
  paymentMethod: string;
  paymentInfo: PaymentInfoProps;
}
