import { DomainError } from './DomainError';

export class MissingComparerError extends Error implements DomainError {
  constructor() {
    super('No comparer was provided');
    this.name = 'MissingComparerError';
  }
}
