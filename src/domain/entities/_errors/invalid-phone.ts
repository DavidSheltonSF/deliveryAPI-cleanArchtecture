import { DomainError } from './domain-error';

export class InvalidPhoneError extends Error implements DomainError {
  constructor (phone: string) {
    super(`The phone ${phone} is invalid`);
    this.name = 'InvalidPhoneError';
  }
}