import { ApplicationError } from './application-error';

export class SimilarPasswordsError extends Error implements ApplicationError {
  constructor() {
    super('The new password is similar to the current one');
    this.name = SimilarPasswordsError.name;
  }
}
