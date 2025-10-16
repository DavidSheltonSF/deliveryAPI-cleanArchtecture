import { ControllerError } from './controller-error'

export class InvalidParamError extends Error implements ControllerError {
  constructor (paramName: string) {
    super(`Param ${paramName} is invalid.`);
    this.name = 'InvalidParamError';
  }
}