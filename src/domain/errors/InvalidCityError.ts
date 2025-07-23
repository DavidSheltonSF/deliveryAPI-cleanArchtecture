import { DomainError } from './DomainError';

export class InvalidCityError extends Error implements DomainError {
  constructor(city: string) {
    super(`The city ${city} is invalid`);
    this.name = 'InvalidCityError';
  }
}
