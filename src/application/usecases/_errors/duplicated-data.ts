import { ApplicationError } from "./application-error";


export class DuplicatedDataError extends Error implements ApplicationError {
  constructor (msg: string) {
    super(msg);
    this.name = 'DuplicatedDataError';
  }
} 