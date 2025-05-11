import { ControllerError } from './controller-error'

export class MissingRequestBodyError extends Error implements ControllerError {
  constructor () {
    super('Missing request body');
    this.name = 'MissingRequestBodyError';
  }
}