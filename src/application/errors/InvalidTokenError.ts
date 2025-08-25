import { ApplicationError } from "./application-error";

export class InvalidTokenError extends Error implements ApplicationError {
  constructor () {
    super('Token provided is invalid or has expired');
    this.name = InvalidTokenError.name;
  }
} 