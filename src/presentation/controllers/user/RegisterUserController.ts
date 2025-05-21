import { RegisterUser } from "../../../application/usecases/user/register-user/interface";
import { HttpRequest } from "../../_ports/http";
import { MissingParamError } from "../../_errors/missing-param";
import { ok, badRequest, unprocessableEntity, serverError } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";

export class RegisterUserController {

  private readonly registerUser: RegisterUser

  constructor(registerUser: RegisterUser) {
    this.registerUser = registerUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredParams = ['username', 'email', 'phone', 'role', 'cpf', 'authentication']
      const userData = request.body;

      for (let i in requiredParams){
        if (!Object.keys(userData).includes(requiredParams[i])){
          return badRequest(new MissingParamError(requiredParams[i]));
        }
      }

      const response = await this.registerUser.execute(userData);

      if (response.isLeft()){
        return unprocessableEntity(response.getLeft());
      }

      return ok(response);

    }catch(error){
      console.log(error);
      return serverError('internal')
    }
  }

}