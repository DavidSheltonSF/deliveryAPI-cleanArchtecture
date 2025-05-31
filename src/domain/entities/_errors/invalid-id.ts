import { DomainError } from './domain-error';

export class InvalidIdError extends Error implements DomainError {
  constructor (id: string) {
    super(`The ID ${id} is invalid`);
    this.name = 'InvalidIdError';
  }
}