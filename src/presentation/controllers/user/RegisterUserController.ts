import { RegisterUser } from "../../../application/usecases/user/register-user/interface";
import { HttpRequest } from "../../_ports/http";
import { MissingParamError } from "../../_errors/missing-param";
import { created, badRequest, unprocessableEntity, serverError } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";
import { MissingRequestBodyError } from "../../_errors/missing-request-body-error";
import { Controller } from "../Controller";

export class RegisterUserController implements Controller{

  private readonly registerUser: RegisterUser

  constructor(registerUser: RegisterUser) {
    this.registerUser = registerUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredParams = ['username', 'email', 'phone', 'role', 'cpf', 'authentication']
      const userData = request.body;

      if(!request.body){
        console.log(request)
        return badRequest(new MissingRequestBodyError());
      }

      for (let i in requiredParams){
        if (!Object.keys(userData).includes(requiredParams[i])){
          return badRequest(new MissingParamError(requiredParams[i]));
        }
      }

      const response = await this.registerUser.execute(userData);

      if (response.isLeft()){
        return unprocessableEntity(response.getLeft());
      }

      return created(response.getRight());

    }catch(error){
      console.log(error);
      return serverError('internal')
    }
  }

}