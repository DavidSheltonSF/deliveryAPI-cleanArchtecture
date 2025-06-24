import { RegisterUser } from '../../../application/usecases/customer/RegisterCustomer/interface';
import { HttpRequest } from '../../_ports/http';
import { MissingFieldError } from '../../_errors/missing-field';
import {
  created,
  badRequest,
  unprocessableEntity,
  serverError,
} from '../../_helpers/http-helper';
import { HttpResponse } from '../../_ports/http';
import { MissingRequestBodyError } from '../../_errors/missing-request-body-error';
import { Controller } from '../Controller';

export class RegisterCustomerController implements Controller {
  private readonly registerUser: RegisterUser;

  constructor(registerUser: RegisterUser) {
    this.registerUser = registerUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'username',
        'email',
        'phone',
        'role',
        'cpf',
        'authentication',
      ];
      const userData = request.body;

      if (!userData) {
        return badRequest(new MissingRequestBodyError());
      }

      const missingFields = [];

      for (let i in requiredFields) {
        if (!Object.keys(userData).includes(requiredFields[i])) {
          missingFields.push(requiredFields[i]);
        }
      }

      if (missingFields.length > 0) {
        return badRequest(new MissingFieldError(missingFields));
      }

      const response = await this.registerUser.execute(userData);

      if (response.isLeft()) {
        return unprocessableEntity(response.getLeft());
      }

      return created(response.getRight());
    } catch (error) {
      console.log(error);
      return serverError('internal');
    }
  }
}
