import { DomainError } from './domain-error';

export class InvalidEmailError extends Error implements DomainError {
  constructor (name: string) {
    super(`The email ${name} is invalid`);
    this.name = 'InvalidEmailError';
  }
}