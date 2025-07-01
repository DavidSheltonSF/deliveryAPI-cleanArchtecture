import { DomainError } from './DomainError';

export class MissingHasherError extends Error implements DomainError {
  constructor() {
    super("No hasher was provided");
    this.name = 'MissingHasherError';
  }
}
