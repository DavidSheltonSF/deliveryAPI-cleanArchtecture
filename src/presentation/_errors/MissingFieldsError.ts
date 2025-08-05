import { ControllerError } from './controller-error'

export class MissingFieldsError extends Error implements ControllerError {
  constructor (fields: string[]) {
    let fieldsStr = "";
   
    fields.forEach((fields, i) => {
      fieldsStr+=fields;
      
      if(i+1 < fields.length){
        fieldsStr + ', '
      }
    })

    super(`Missing: ${fieldsStr}`);
    this.name = 'MissingFieldError';
  }
}