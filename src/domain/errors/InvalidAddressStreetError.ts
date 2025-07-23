import { DomainError } from './DomainError';

export class InvalidAddressStreetError extends Error implements DomainError {
  constructor(street: string) {
    super(`The street ${street} is invalid`);
    this.name = 'InvalidAddressStreetError';
  }
}
