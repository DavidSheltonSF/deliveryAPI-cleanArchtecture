import { PaymentMethod } from "../_enums";
import { Either } from "../../../../shared/either";
import { BankInfo } from "../_interfaces";
import { InvalidPaymentMethodError, InvalidCardNumberError } from "../../_errors";

export class BankInfoValidator {
  private readonly bankinfo: BankInfo ;

  constructor(bankinfo: BankInfo ){
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

  static validate(bankinfo: BankInfo ): Boolean{
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

  static create(bankinfo: BankInfo ): Either<InvalidPaymentMethodError | InvalidCardNumberError, BankInfoValidator> {
    if (!this.validatePaymentMethod(bankinfo.paymentMethod)) {
      return Either.left(new InvalidPaymentMethodError(bankinfo.paymentMethod));
    }

    if (bankinfo.paymentMethod === PaymentMethod.CREDIT_CARD) {
      if (!this.validateCardNumber(bankinfo.paymentInfo.cardNumber)) {
        return Either.left(new InvalidCardNumberError(bankinfo.paymentInfo.cardNumber));
      }
    }

    return Either.right(new BankInfoValidator(bankinfo));
  }

  get(): BankInfo  {
    return this.bankinfo;
  }
}