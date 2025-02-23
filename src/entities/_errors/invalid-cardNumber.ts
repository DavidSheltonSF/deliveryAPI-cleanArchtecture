import { DomainError } from './domain-error';

export class InvalidCardNumberError extends Error implements DomainError {
  constructor (role: string) {
    super(`The role ${role} is invalid`);
    this.name = 'InvalidCardNumber';
  }
}