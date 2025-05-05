import { ApplicationError } from "./application-error";


export class NoResultError extends Error implements ApplicationError {
  constructor (msg: string) {
    super(msg);
    this.name = ' NoResultError';
  }
} 