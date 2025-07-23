import { DomainError } from './DomainError';

export class InvalidAddressCityError extends Error implements DomainError {
  constructor(city: string) {
    super(`The city ${city} is invalid`);
    this.name = 'InvalidAddressCityError';
  }
}
