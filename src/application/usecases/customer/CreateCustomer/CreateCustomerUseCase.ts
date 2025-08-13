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
import { validateEitherValues } from '../../../../utils/validateEitherValues';

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

    const userPropsOrError = CustomerMapper.rawToProps(rawUser);
    const addressPropsOrError = AddressMapper.rawToProps(rawAddress);
    const authenticationPropsOrError = await AuthenticationMapper.rawToProps(
      rawAuthentication,
      this.hashService
    );

    const validation = validateEitherValues([
      userPropsOrError,
      addressPropsOrError,
      authenticationPropsOrError,
    ]);

    if (validation.isLeft()) {
      return Either.left(validation.getLeft());
    }

    const addressProps = addressPropsOrError.getRight();

    const authenticationProps = authenticationPropsOrError.getRight();

    const customerProps = userPropsOrError.getRight();

    const createdCustomer = await this.customerRepository.create(customerProps);
    const customerId = createdCustomer.id;

    addressProps.userId = customerId;
    const createdAddress = await this.addressRepository.create(addressProps);

    authenticationProps.userId = customerId;
    await this.authenticationRepository.create(authenticationProps);

    //const userResponse = CustomerMapper.propsToResponseDTO(createdCustomer);
    //const addressResponse = AddressMapper.propsToResponseDTO(createdAddress);
    const userResponse = {
      id: createdCustomer.id,
      firstName: createdCustomer.firstName.getValue(),
      lastName: createdCustomer.lastName.getValue(),
      email: createdCustomer.email.getValue(),
      cpf: createdCustomer.cpf.getValue(),
      phone: createdCustomer.phone.getValue(),
      role: createdCustomer.role,
      birthday: createdCustomer.birthday.getValue(),
    };

    const addressResponse = {
      id: createdAddress.id,
      userId: createdAddress.userId,
      street: createdAddress.street,
      city: createdAddress.city,
      state: createdAddress.state,
      zipCode: createdAddress.zipCode.getValue(),
    };

    const response = {
      ...userResponse,
      address: addressResponse,
    };

    return Either.right(response);
  }
}
