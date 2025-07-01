import { DomainError } from './DomainError';

export class InvalidZipCodeError extends Error implements DomainError {
  constructor(zipCode: string) {
    super(`The zipCode ${zipCode} is invalid`);
    this.name = 'InvalidZipCodeError';
  }
}
