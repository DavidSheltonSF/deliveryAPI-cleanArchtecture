import { DomainError } from './DomainError';

export class InvalidStateError extends Error implements DomainError {
  constructor(state: string) {
    super(`The street ${state} is invalid`);
    this.name = 'InvalidStateError';
  }
}
