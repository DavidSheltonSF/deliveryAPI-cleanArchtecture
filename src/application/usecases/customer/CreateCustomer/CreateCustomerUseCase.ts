import { CreateUser } from './interface';
import { CreateCustomerResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../errors/duplicated-data';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { AddressRepository } from '../../../ports/AddressRepository';
import { AuthenticationRepository } from '../../../ports/AuthenticationRepository';
import { CustomerRepository } from '../../../ports/CustomerRepository';
import { AddressMapper } from '../../../../mappers/AddressMapper';
import { InvalidAgeError } from '../../../errors';
import { HashService } from '../../../../domain/contracts/HashService';
import { CustomerMapper } from '../../../../mappers/CustomerMapper';
import { AuthenticationMapper } from '../../../../mappers/AuthenticationMapper';
import { RawDataExtractor } from '../../../helpers/RawDataExtractor';
import { aggregateEitherValues } from '../../../../utils/aggregateEitherValues';
import { UserFactory } from '../../../../factories/UserFactory';
import { AddressFactory } from '../../../../factories/AddressFactory';
import { AuthenticationFactory } from '../../../../factories/AuthenticationFactory';

export class CreateCustomerUseCase implements CreateUser {
  private readonly customerRepository: CustomerRepository;
  private readonly addressRepository: AddressRepository;
  private readonly authenticationRepository: AuthenticationRepository;
  private readonly hashService: HashService;

  constructor(
    customerRepository: CustomerRepository,
    addressRepository: AddressRepository,
    authenticationRepository: AuthenticationRepository,
    hashService: HashService
  ) {
    this.customerRepository = customerRepository;
    this.addressRepository = addressRepository;
    this.authenticationRepository = authenticationRepository;
    this.hashService = hashService;
  }

  async execute(data: CreateUserDTO): Promise<CreateCustomerResponse> {
    const rawUser = RawDataExtractor.extractUser(data);
    const rawAddress = RawDataExtractor.extractAddress(data);
    const rawAuthentication = RawDataExtractor.extractAuthentication(data);
    const email = rawUser.email;

    const existingUser = await this.customerRepository.findByEmail(
      rawUser.email
    );
    if (existingUser !== null && existingUser.email.getValue() === email) {
      return Either.left(
        new DuplicatedDataError(
          `There is already a user with email '${email}'.`
        )
      );
    }

    const customerOrError = UserFactory.create(rawUser)
    const addressOrError = AddressFactory.create(rawAddress);
    const authOrError = await AuthenticationFactory.create(
      rawAuthentication,
      this.hashService
    );

    const validation = aggregateEitherValues([
      customerOrError,
      addressOrError,
      authOrError,
    ]);

    if (validation.isLeft()) {
      return Either.left(validation.getLeft());
    }

    const address = addressOrError.getRight();

    const authentication = authOrError.getRight();

    const customer = customerOrError.getRight();

    const createdCustomer = await this.customerRepository.create(customer);
    const customerId = createdCustomer.id;

    address.userId = customerId;
    const createdAddress = await this.addressRepository.create(address);

    authentication.userId = customerId;
    await this.authenticationRepository.create(authentication);

    const addressResponse = AddressMapper.toResponse(createdAddress);
    const userResponse = CustomerMapper.toResponse(createdCustomer)

    const response = {
      ...userResponse,
      address: addressResponse,
    };

    return Either.right(response);
  }
}
