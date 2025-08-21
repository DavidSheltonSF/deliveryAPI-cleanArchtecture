import { HttpRequest } from '../../_ports/http';
import {
  badRequest,
  unprocessableEntity,
  serverError,
} from '../../_helpers/http-helper';
import { HttpResponse } from '../../_ports/http';
import { MissingRequestBodyError } from '../../_errors/missing-request-body-error';
import { Controller } from '../Controller';
import { UpdateUser } from '../../../application/usecases/customer/UpdateCustomer/interface';
import { ok } from '../../_helpers/http-helper';
import { UpdateCustomerUseCase } from '../../../application/usecases/customer/UpdateCustomer/UpdateCustomerUseCase';

export class UpdateCustomerController implements Controller {
  private readonly updateCustomer: UpdateUser;

  constructor(updateCustomer: UpdateCustomerUseCase) {
    this.updateCustomer = updateCustomer;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (request.params.id === undefined) {
        return badRequest(Error('Missing customer id'));
      }
      if (request.body === undefined) {
        return badRequest(new MissingRequestBodyError());
      }

      const id = request.params.id;
      const { firstName, lastName, cpf, phone, birthday } = request.body;

      const response = await this.updateCustomer.execute(id, {
        firstName,
        lastName,
        cpf,
        phone,
        birthday,
      });

      if (response.isLeft()) {
        return unprocessableEntity(response.getLeft());
      }

      return ok(response.getRight());
    } catch (error) {
      console.log(error);
      return serverError('internal');
    }
  }
}
