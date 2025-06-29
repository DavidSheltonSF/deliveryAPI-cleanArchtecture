import { DomainError } from './DomainError';

export class InvalidPaymentMethodError extends Error implements DomainError {
  constructor(paymentMethod: string) {
    super(`The payment method ${paymentMethod} is invalid`);
    this.name = 'InvalidPaymentMethod';
  }
}
