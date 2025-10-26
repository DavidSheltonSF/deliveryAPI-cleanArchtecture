import { ControllerError } from './controller-error'

export class MissingFieldsError extends Error implements ControllerError {
  constructor (fields: string[]) {
    const fieldListStr = fields.toString().split(',').join(', ');
    super(`Missing: ${fieldListStr}`);
    this.name = 'MissingFieldError';
  }
}