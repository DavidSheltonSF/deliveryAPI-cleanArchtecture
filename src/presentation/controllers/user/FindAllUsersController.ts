import { FindAllUsers } from "../../../application/usecases/user/find-all-users/interface"
import { HttpRequest } from "../../_ports/http";
import { ok, badRequest, unprocessableEntity, serverError } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";

export class FindAllUsersController {

  private readonly findAllUsers: FindAllUsers

  constructor(findAllUsers: FindAllUsers) {
    this.findAllUsers = findAllUsers;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{

      const response = await this.findAllUsers.execute();

      return ok(response);

    }catch(error){
      console.log(error);
      return serverError('internal');
    }
  }

}