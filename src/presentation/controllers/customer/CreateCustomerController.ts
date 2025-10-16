import { HttpRequest } from '../../ports/http';
import {
  created,
  badRequest,
  unprocessableEntity,
  serverError,
} from '../../helpers/http-helper';
import { HttpResponse } from '../../ports/http';
import { MissingRequestBodyError } from '../../errors/missing-request-body-error';
import { Controller } from '../Controller';
import { CreateUser } from '../../../application/usecases/customer/CreateCustomer/interface';
import { MissingFieldsError } from '../../errors';
import { checkCreateCustomerFields } from '../helpers/checkCreateCustomerFields';
import { serializeError } from '../helpers/serializeError';

export class CreateCustomerController implements Controller {
  private readonly createCustomer: CreateUser;

  constructor(createCustomer: CreateUser) {
    this.createCustomer = createCustomer;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body || Object.keys(request.body).length === 0) {
        return badRequest(serializeError(new MissingRequestBodyError()));
      }

      const missingFields = checkCreateCustomerFields(request.body)
      if(missingFields.length > 0){
        return badRequest(serializeError(new MissingFieldsError(missingFields)));
      }

      const {
        firstName,
        lastName,
        email,
        cpf,
        phone,
        role,
        birthday,
        password,
      } = request.body;

      const address = request.body.address;

      const response = await this.createCustomer.execute({
        firstName,
        lastName,
        email,
        cpf,
        phone,
        role,
        birthday,
        password,
        address,
      });

      if (response.isLeft()) {
        return unprocessableEntity(serializeError(response.getLeft()));
      }

      return created(response.getRight());
    } catch (error) {
      console.log(error);
      return serverError('internal');
    }
  }
}
