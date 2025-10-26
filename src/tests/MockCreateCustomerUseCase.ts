import { DuplicatedDataError } from '../application/errors';
import { AddressRepository } from '../application/ports/AddressRepository';
import { CustomerRepository } from '../application/ports/CustomerRepository';
import { CreateUser } from '../application/usecases/customer/CreateCustomer/interface';
import { CreateCustomerResponse } from '../application/usecases/customer/CreateCustomer/response';
import { HashService } from '../domain/contracts/HashService';
import { CustomerDTO } from '../presentation/dtos/CustomerDTO';
import { Either } from '../shared/either';
import { UserMocker } from './mocks/UserMocker';

export class MockedCreateCustomerUseCase implements CreateUser {
  readonly executeParams: { customer: CustomerDTO } = {
    customer: null,
  };
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly addressRepository: AddressRepository,
    private readonly hashService: HashService
  ) {}

  async execute(customer: CustomerDTO): Promise<CreateCustomerResponse> {
    this.executeParams.customer = customer;
    const mockCustomer = UserMocker.mockCustomerResponseDTO();

    return new Promise(async (resolve) => {
      const existingCustomer = await this.customerRepository.findByEmail(
        customer.email
      );

      if (existingCustomer.email.getValue() === customer.email) {
        resolve(
          Either.left(
            new DuplicatedDataError(
              `There is already a user using the email ${customer.email}`
            )
          )
        );
      }

      resolve(Either.right(mockCustomer));
    });
  }

  calledWith(data: CustomerDTO) {
    const dataStr = JSON.stringify(data);
    const providedCustomer = JSON.stringify(this.executeParams.customer);
    return dataStr === providedCustomer;
  }
}
