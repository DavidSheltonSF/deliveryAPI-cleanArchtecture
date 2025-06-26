import { DomainError } from './DomainError';

export class InvalidBirthdayError extends Error implements DomainError {
  constructor(birthday: string) {
    super(`The birthday ${birthday} is invalid`);
    this.name = 'InvalidBirthDayError';
  }
}
