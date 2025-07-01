import { DomainError } from './DomainError';

export class InvalidUserNameError extends Error implements DomainError {
  constructor(username: string) {
    super(`The username ${username} is invalid`);
    this.name = 'InvalidUserNameError';
  }
}
