import { HttpRequest } from '../../_ports/http';
import {
  created,
  badRequest,
  unprocessableEntity,
  serverError,
} from '../../_helpers/http-helper';
import { HttpResponse } from '../../_ports/http';
import { MissingRequestBodyError } from '../../_errors/missing-request-body-error';
import { Controller } from '../Controller';
import { CreateUser } from '../../../application/usecases/customer/CreateCustomer/interface';
import { MissingFieldsFinder } from '../helpers/MissingFieldsFinder';
import { MissingFieldsError } from '../../_errors';

export class CreateCustomerController implements Controller {
  private readonly createCustomer: CreateUser;

  constructor(createCustomer: CreateUser) {
    this.createCustomer = createCustomer;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (request.body === undefined) {
        return badRequest(new MissingRequestBodyError());
      }

      const customerData = request.body;

      const missingFields =
        MissingFieldsFinder.checkCreateCustomerRequestFields(request);
      if (missingFields.length > 0) {
        return badRequest(new MissingFieldsError(missingFields));
      }

      const response = await this.createCustomer.execute(
        customerData,
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
