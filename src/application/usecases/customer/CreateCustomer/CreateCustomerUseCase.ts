import { CreateUser } from './interface';
import { CreateCustomerResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { AddressRepository } from '../../../_ports/AddressRepository';
import { AuthenticationRepository } from '../../../_ports/AuthenticationRepository';
import { CustomerRepository } from '../../../_ports/CustomerRepository';
import { AddressMapper } from '../../../../mappers/AddressMapper';
import { InvalidAgeError } from '../../../_errors';
import { HashService } from '../../../../domain/contracts/HashService';
import { CustomerMapper } from '../../../../mappers/CustomerMapper';
import { AuthenticationMapper } from '../../../../mappers/AuthenticationMapper';
import { RawDataExtractor } from '../../../helpers/RawDataExtractor';
import { validateEitherValues } from '../../../../utils/validateEitherValues';
import { Address } from '../../../../domain/entities/Address';
import { CustomerUser } from '../../../../domain/entities/CustomerUser';
import { Authentication } from '../../../../domain/entities/Authentication';

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
    if (existingUser !== null && existingUser.email === email) {
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
    const address = Address.create(addressProps);

    const authenticationProps = authenticationPropsOrError.getRight();
    const authentication = await Authentication.create(
      authenticationProps,
      this.hashService
    );

    const userProps = userPropsOrError.getRight();
    const customerEntity = CustomerUser.create(
      userProps,
      address,
      authentication
    );

    if (!customerEntity.isAdult()) {
      return Either.left(new InvalidAgeError());
    }

    const customerModel = await this.customerRepository.create(customerEntity);
    const addressModel = await this.addressRepository.create(address);
    await this.authenticationRepository.create(authentication);

    const userResponse = CustomerMapper.modelToResponseDTO(customerModel);
    const addressResponse = AddressMapper.modelToResponseDTO(addressModel);

    const response = {
      ...userResponse,
      address: addressResponse,
    };

    return Either.right(response);
  }
}
