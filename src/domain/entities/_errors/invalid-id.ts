import { DomainError } from './domain-error';

export class InvalidIDError extends Error implements DomainError {
  constructor (id: string) {
    super(`The ID ${id} is invalid`);
    this.name = 'InvalidIDError';
  }
}