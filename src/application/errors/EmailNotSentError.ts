import { ApplicationError } from "./application-error";


export class EmailNotSentErrror extends Error implements ApplicationError {
  constructor (msg: string) {
    super(msg);
    this.name = 'EmailNotSentErrror';
  }
} 