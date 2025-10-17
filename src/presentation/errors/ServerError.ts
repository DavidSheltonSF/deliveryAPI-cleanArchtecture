import { ControllerError } from './controller-error';

export class ServerError extends Error implements ControllerError {
  constructor(message: string = 'Internal server error') {
    super(message);
    this.name = 'ServerError';
  }
}
