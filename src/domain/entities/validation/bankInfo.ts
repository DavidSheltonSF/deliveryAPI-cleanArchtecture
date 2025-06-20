import { PaymentMethod } from './_enums';
import { Either } from './../../../shared/either';
import { InvalidPaymentMethodError, InvalidCardNumberError } from '../errors';


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

export class BankInfo {
  private readonly bankInfo: BankInfoProps;

  constructor(bankInfo: BankInfoProps) {
    this.bankInfo = bankInfo;
    Object.freeze(this);
  }

  static validateCardNumber(cardNumber: string): Boolean {
    const cardNumberRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;

    if (!cardNumber || !cardNumber.match(cardNumberRegex)) {
      return false;
    }
    return true;
  }

  static validatePaymentMethod(paymentMethod: string): Boolean {
    if (
      !Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)
    ) {
      return false;
    }
    return true;
  }

  static validate(bankInfo: BankInfoProps): Boolean {
    if (!this.validatePaymentMethod(bankInfo.paymentMethod)) {
      return false;
    }

    if (bankInfo.paymentMethod === PaymentMethod.CREDIT_CARD) {
      if (!this.validateCardNumber(bankInfo.paymentInfo.cardNumber)) {
        return false;
      }
    }

    return true;
  }

  static create(
    bankInfo: BankInfoProps
  ): Either<InvalidPaymentMethodError | InvalidCardNumberError, BankInfo> {
    if (!this.validatePaymentMethod(bankInfo.paymentMethod)) {
      return Either.left(new InvalidPaymentMethodError(bankInfo.paymentMethod));
    }

    if (bankInfo.paymentMethod === PaymentMethod.CREDIT_CARD) {
      if (!this.validateCardNumber(bankInfo.paymentInfo.cardNumber)) {
        return Either.left(
          new InvalidCardNumberError(bankInfo.paymentInfo.cardNumber)
        );
      }
    }

    return Either.right(new BankInfo(bankInfo));
  }

  get(): BankInfoProps {
    return this.bankInfo;
  }
}
