import { RegisterCustomer } from '../../../application/usecases/customer/RegisterCustomer/interface';
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
import { CustomerDtoMapper } from '../../mappers/CustomerDtoMapper';
import { CreateUser } from '../../../application/usecases/customer/CreateCustomer/interface';

export class RegisterCustomerController implements Controller {
  private readonly registerUser: CreateUser;

  constructor(registerUser: RegisterCustomer) {
    this.registerUser = registerUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'username',
        'name',
        'email',
        'phone',
        'role',
        'cpf',
        'birthday',
        'authentication',
      ];
      const customerData = request.body;

      if (!customerData) {
        return badRequest(new MissingRequestBodyError());
      }

      const missingFields = [];

      for (let i in requiredFields) {
        if (!Object.keys(customerData).includes(requiredFields[i])) {
          missingFields.push(requiredFields[i]);
        }
      }

      if (missingFields.length > 0) {
        return badRequest(new MissingFieldError(missingFields));
      }
      const response = await this.registerUser.execute(
        customerData
      );

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
