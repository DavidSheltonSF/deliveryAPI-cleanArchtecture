import { DomainError } from './DomainError';

export class InvalidAddressZipCodeError extends Error implements DomainError {
  constructor(zipCode: string) {
    super(`The zipCode ${zipCode} is invalid`);
    this.name = 'InvalidAddressZipCodeError';
  }
}
