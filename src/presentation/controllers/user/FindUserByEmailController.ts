import { FindUserByEmail } from "../../../application/usecases/user/find-user-by-email/interface"
import { HttpRequest } from "../../_ports/http";
import { ok, notFound, badRequest, serverError, unprocessableEntity } from "../../_helpers/http-helper";
import { HttpResponse } from "../../_ports/http";
import { MissingParamError } from "../../_errors";
import { InvalidEmailError } from "../../../domain/entities/_errors/invalid-email";

export class FindUserByEmailController {

  private readonly findUserByEmail: FindUserByEmail

  constructor(findUserByEmail: FindUserByEmail) {
    this.findUserByEmail = findUserByEmail;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try{

      const { email } = request.params;

      if(!email){
        return badRequest(new MissingParamError("email"))
      }

      const response = await this.findUserByEmail.execute(email);

      if (response.isLeft()){
        return unprocessableEntity(new InvalidEmailError(email));
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