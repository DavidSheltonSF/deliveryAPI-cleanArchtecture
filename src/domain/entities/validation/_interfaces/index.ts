

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
