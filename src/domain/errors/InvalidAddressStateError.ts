import { DomainError } from './DomainError';

export class InvalidAddressStateError extends Error implements DomainError {
  constructor(state: string) {
    super(`The street ${state} is invalid`);
    this.name = 'InvalidAddressStateError';
  }
}
