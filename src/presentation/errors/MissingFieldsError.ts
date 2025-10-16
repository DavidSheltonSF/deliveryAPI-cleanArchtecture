import { ControllerError } from './controller-error'

export class MissingFieldsError extends Error implements ControllerError {
  constructor (fields: string[]) {
    super(`Missing: ${fields.toString()}`);
    this.name = 'MissingFieldError';
  }
}