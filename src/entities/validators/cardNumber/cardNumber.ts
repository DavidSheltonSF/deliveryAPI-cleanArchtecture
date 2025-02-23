import { Either } from "../../../shared/either";
import { InvalidCardNumberError } from "../../_errors/invalid-cardNumber";

export class CardNumber {
  private readonly cardNumber: string;

  constructor(cardNumber: string){
    this.cardNumber = cardNumber;
    Object.freeze(this);
  };

  static validate(cardNumber: string): Boolean{

    const cardNumberRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;

    if(!cardNumber.match(cardNumberRegex)) {
      return false
    }
    return true;
  }

  static create(cardNumber: string): Either<InvalidCardNumberError, CardNumber> {
    if (!this.validate(cardNumber)) {
      return Either.left(new InvalidCardNumberError(cardNumber));
    }

    return Either.right(new CardNumber(cardNumber));
  }

  get(): string {
    return this.cardNumber;
  }
}