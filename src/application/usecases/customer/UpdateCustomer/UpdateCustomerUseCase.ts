import { UpdateUser } from './interface';
import { UpdateCustomerResponse } from './response';
import { Either } from '../../../../shared/either';
import { UpdateUserProfileDTO } from '../../../../presentation/dtos/UpdateUserProfileDTO';
import { CustomerRepository } from '../../../ports/CustomerRepository';
import { UserMapper } from '../../../../mappers/UserMapper';
import { UserFactory } from '../../../../factories/UserFactory';
import { NoResultError } from '../../../errors';

export class UpdateCustomerUseCase implements UpdateUser {
  private readonly customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    id: string,
    data: UpdateUserProfileDTO
  ): Promise<UpdateCustomerResponse> {
    const existingUser = await this.customerRepository.findById(id);
    if (existingUser === null) {
      return Either.left(
        new NoResultError(`The customer with id ${id} was not found`)
      );
    }

    const partialCustomerOrError = UserFactory.createPartial(data);

    if (partialCustomerOrError.isLeft()) {
      return Either.left(partialCustomerOrError.getLeft());
    }

    const partialCustomer = partialCustomerOrError.getRight();

    if (partialCustomer.firstName) {
      existingUser.firstName = partialCustomer.firstName;
    }

    if (partialCustomer.lastName) {
      existingUser.lastName = partialCustomer.lastName;
    }

    if (partialCustomer.cpf) {
      existingUser.cpf = partialCustomer.cpf;
    }

    if (partialCustomer.phone) {
      existingUser.phone = partialCustomer.phone;
    }

    if (partialCustomer.birthday) {
      existingUser.birthday = partialCustomer.birthday;
    }

    const updatedCustomer = await this.customerRepository.update(id, existingUser);
    const userResponse = UserMapper.toResponse(updatedCustomer);

    const response = {
      ...userResponse,
    };

    return Either.right(response);
  }
}
