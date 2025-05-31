import { FindUserById } from "../../../application/usecases/user/find-user-by-id/interface"
import { HttpRequest } from "../../_ports/http";
import { ok, notFound, badRequest, serverError, unprocessableEntity } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";
import { MissingParamError } from "../../_errors";
import { InvalidIdError } from "../../../domain/entities/errors";
import { Controller } from "../Controller";

export class FindUserByIdController implements Controller {

  private readonly findUserById: FindUserById

  constructor(findUserById: FindUserById) {
    this.findUserById = findUserById;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{

      const { id } = request.params;

      if(!id){
        return badRequest(new MissingParamError(["id"]))
      }

      const response = await this.findUserById.execute(id);

      if (response.isLeft()){
        return unprocessableEntity(new InvalidIdError(id));
      }

      const user = response.getRight();

      if (!user){
        return notFound({
          message: "User not found"
        })
      }

      return ok(user);

    }catch(error){
      console.log(error);
      return serverError('internal');
    }
  }

}