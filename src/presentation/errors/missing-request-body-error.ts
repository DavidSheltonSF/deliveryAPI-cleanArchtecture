import { ControllerError } from './controller-error'

export class MissingRequestBodyError extends Error implements ControllerError {
  constructor () {
    super('Request body is missing');
    this.name = 'MissingRequestBodyError';
  }
}