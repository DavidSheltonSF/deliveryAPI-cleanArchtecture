import { DeleteUser } from "../../../application/usecases/user/delete-user/interface";
import { HttpRequest } from "../../_ports/http";
import { MissingParamError } from "../../_errors/missing-param";
import { noContent, badRequest, unprocessableEntity, serverError } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";
import { Controller } from "../Controller";

export class DeleteUserController implements Controller {

  private readonly deleteUser: DeleteUser

  constructor(deleteUser: DeleteUser) {
    this.deleteUser = deleteUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{
      
      if(!request.params.id){
        return badRequest(new MissingParamError(['id']));
      }

      const response = await this.deleteUser.execute(request.params.id);

      if (response.isLeft()){
        return unprocessableEntity(response.getLeft());
      }

      return noContent();

    }catch(error){
      console.log(error);
      return serverError('internal');
    }
  }

}