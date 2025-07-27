import { DomainError } from './DomainError';

export class PropertyAlreadySetError extends Error implements DomainError {
  constructor(property: string) {
    super(`Property ${property} already set.`);
    this.name = PropertyAlreadySetError.name;
  }
}
