import { DomainError } from './DomainError';

export class InvalidBirthdayError extends Error implements DomainError {
  constructor() {
    super(`The birthday date is invalid`);
    this.name = 'InvalidBirthDayError';
  }
}
