import { FindAllUsers } from "../../../application/usecases/user/find-all-users/interface"
import { HttpRequest } from "../../_ports/http";
import { ok, serverError } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";
import { Controller } from "../Controller";
import { serializeUser } from "../helpers/serializeUser";

export class FindAllUsersController implements Controller {

  private readonly findAllUsers: FindAllUsers

  constructor(findAllUsers: FindAllUsers) {
    this.findAllUsers = findAllUsers;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{

      const users = await this.findAllUsers.execute();

      const response = users.map(serializeUser);

      return ok(response);

    }catch(error){
      console.log(error);
      return serverError('internal');
    }
  }

}