import { PaymentMethod } from "entities/validators/_enums";
import { Either } from "../../../../shared/either";
import { BankInfo as BankInfoData } from "entities/validators/_interfaces";
import { InvalidPaymentMethodError, InvalidCardNumberError } from "entities/_errors/";

export class BankInfo {
  private readonly bankinfo: BankInfoData;

  constructor(bankinfo: BankInfoData){
    this.bankinfo = bankinfo;
    Object.freeze(this);
  };

  static validateCardNumber(cardNumber: string): Boolean{

    const cardNumberRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;

    if(!cardNumber.match(cardNumberRegex)) {
      return false
    }
    return true;
  }

  static validatePaymentMethod(paymentMethod: string): Boolean{
    if (!Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)) {
      return false;
    }    
    return true;
  }

  static validate(bankinfo: BankInfoData): Boolean{
    if (!this.validatePaymentMethod(bankinfo.paymentMethod)) {
      return false;
    }

    if (bankinfo.paymentMethod === PaymentMethod.CREDIT_CARD) {
      if (!this.validateCardNumber(bankinfo.paymentInfo.cardNumber)) {
        return false;
      }
    }

    return true;
  }

  static create(bankinfo: BankInfoData): Either<InvalidPaymentMethodError | InvalidCardNumberError, BankInfo> {
    if (!this.validatePaymentMethod(bankinfo.paymentMethod)) {
      return Either.left(new InvalidPaymentMethodError(bankinfo.paymentMethod));
    }

    if (bankinfo.paymentMethod === PaymentMethod.CREDIT_CARD) {
      if (!this.validateCardNumber(bankinfo.paymentInfo.cardNumber)) {
        return Either.left(new InvalidCardNumberError(bankinfo.paymentInfo.cardNumber));
      }
    }

    return Either.right(new BankInfo(bankinfo));
  }

  get(): BankInfoData {
    return this.bankinfo;
  }
}