import { DomainError } from './DomainError';

export class InvalidBirthDayError extends Error implements DomainError {
  constructor(birthday: string) {
    super(`The birthday ${birthday} is invalid`);
    this.name = 'InvalidBirthDayError';
  }
}
