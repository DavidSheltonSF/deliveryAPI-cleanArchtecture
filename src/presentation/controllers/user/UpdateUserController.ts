import { UpdateUser } from "../../../application/usecases/user/update-user/interface";
import { HttpRequest } from "../../_ports/http";
import { MissingParamError } from "../../_errors/missing-param";
import { InvalidParamError } from "../../_errors/invalid-param"
import { ok, badRequest, unprocessableEntity, serverError } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";
import { Controller } from "../Controller";
import { MissingRequestBodyError } from "../../_errors";

export class UpdateUserController implements Controller{

  private readonly updateUser: UpdateUser

  constructor(updateUser: UpdateUser) {
    this.updateUser = updateUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{

      const { id } = request.params;
      const userData = request.body;

      if (!id){
        return badRequest(new MissingParamError(['id']));
      }

      if (!userData){
        return badRequest(new MissingRequestBodyError());
      }

      const userFields = ["username", "email", "cpf", "phone", "role", "address", "authentication", "bankInfo"];

      for (const key of Object.keys(userData)){
        if (!userFields.includes(key)){
          return badRequest(new InvalidParamError(key));
        }
      }


      const response = await this.updateUser.execute(id, userData);

      if (response.isLeft()){
        return unprocessableEntity(response.getLeft());
      }

      return ok(response);

    }catch(error){
      console.log(error);
      return serverError('internal');
    }
  }

}