import { ControllerError } from './controller-error'

export class MissingParamError extends Error implements ControllerError {
  constructor (params: string[]) {
    let paramsStr = "";
   
    params.forEach((param, i) => {
      paramsStr+=param;
      
      if(i+1 < params.length){
        paramsStr + ', '
      }
    })

    super(`Missing: ${paramsStr}`);
    this.name = 'MissingParamError';
  }
}