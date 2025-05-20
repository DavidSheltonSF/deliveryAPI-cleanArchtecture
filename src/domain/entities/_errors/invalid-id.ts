import { DomainError } from './domain-error';

export class InvalidIDError extends Error implements DomainError {
  constructor (cpf: string) {
    super(`The cpf ${cpf} is invalid`);
    this.name = 'InvalidIDError';
  }
}