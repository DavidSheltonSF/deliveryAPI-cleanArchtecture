import { DomainError } from './DomainError';

export class InvalidCardNumberError extends Error implements DomainError {
  constructor(cardNumber: string) {
    super(`The card number ${cardNumber} is invalid`);
    this.name = 'InvalidCardNumber';
  }
}
