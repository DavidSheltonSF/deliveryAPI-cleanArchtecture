import { ApplicationError } from './application-error';

export class InvalidAgeError extends Error implements ApplicationError {
  constructor(message: string = 'Too young.') {
    super(message);
    this.name = InvalidAgeError.name;
  }
}
