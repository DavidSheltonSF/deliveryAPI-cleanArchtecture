import { BaseUserDTO } from './base-user-dto';

export interface DriverDTO extends BaseUserDTO {
  cpf: string;
  phone: string;
  role: 'driver';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bankInfo: {
    paymentMethod: string;
    paymentInfo: {
      holderName: string;
      cardNumber?: string;
      expiryDate?: string;
      cvv?: string;
      pix_key?: string;
      bankAccount?: {
        bankName: string;
        accountNumber: string;
      };
    };
  };
}
