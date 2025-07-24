import { ApplicationError } from './application-error';

export class NotMappedFieldError extends Error implements ApplicationError {
  constructor(field: string) {
    super(`Field ${field} is not mapped.`);
    this.name = NotMappedFieldError.name;
  }
}
