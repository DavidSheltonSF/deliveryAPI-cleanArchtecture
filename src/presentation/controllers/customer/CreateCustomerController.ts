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
import { HashService } from '../../../domain/contracts/HashService';

export class CreateCustomerController implements Controller {
  private readonly createCustomer: CreateUser;
  private readonly hasher: HashService;

  constructor(registerUser: RegisterCustomer, hasher: HashService) {
    this.createCustomer = registerUser;
    this.hasher = hasher;
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
      const response = await this.createCustomer.execute(customerData, this.hasher);

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
