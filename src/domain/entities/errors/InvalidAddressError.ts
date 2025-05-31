import { DomainError } from './DomainError';

export class InvalidAddressError extends Error implements DomainError {
  constructor (address: string) {
    super(`The address ${address} is invalid`);
    this.name = 'InvalidAddressError';
  }
}