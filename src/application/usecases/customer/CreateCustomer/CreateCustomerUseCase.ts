import { CreateUser } from './interface';
import { CreateCustomerResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { validateCustomer } from '../../../helpers/validateCustomer';
import { AddressRepository } from '../../../_ports/AddressRepository';
import { AuthenticationRepository } from '../../../_ports/AuthenticationRepository';
import { CustomerRepository } from '../../../_ports/CustomerRepository';
import { AddressMapper } from '../../../../mappers/AddressMapper';
import { AddressFactory } from '../../../../domain/factories/AddressFactory';
import { AuthenticationFactory } from '../../../../domain/factories/AuthenticationFactory';
import { InvalidAgeError } from '../../../_errors';
import { HashService } from '../../../../domain/contracts/HashService';
import { CustomerFactory } from '../../../../domain/factories/CustomerFactory';
import { CustomerMapper } from '../../../../mappers/CustomerMapper';
import { AuthenticationMapper } from '../../../../mappers/AuthenticationMapper';

export class CreateCustomerUseCase implements CreateUser {
  private readonly customerRepository: CustomerRepository;
  private readonly addressRepository?: AddressRepository;
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(
    customerRepository: CustomerRepository,
    authenticationRepository: AuthenticationRepository,
    addressRepository: AddressRepository
  ) {
    this.customerRepository = customerRepository;
    this.addressRepository = addressRepository;
    this.authenticationRepository = authenticationRepository;
  }

  async execute(
    customerData: CreateUserDTO,
    hasher: HashService
  ): Promise<CreateCustomerResponse> {
    const validation = validateCustomer(customerData);
    if (validation.isLeft()) {
      return Either.left(validation.getLeft());
    }

    const { email, role, address, authentication } = customerData;

    const existingUser = await this.customerRepository.findByEmail(email);
    if (existingUser !== null && existingUser.email === email) {
      return Either.left(
        new DuplicatedDataError(
          `There is already a user with email '${email}'.`
        )
      );
    }

    const userProps = CustomerMapper.rawToProps(customerData);
    const addressProps = AddressMapper.rawToProps(address);
    const authenticationProps = AuthenticationMapper.rawToProps(authentication);

    const addressEntity = AddressFactory.create(addressProps);

    authentication.password = await hasher.hash(authentication.password);
    const authenticationEntity = AuthenticationFactory.create(
      authenticationProps,
      hasher
    );

    const customerEntity = await CustomerFactory.create(
      userProps,
      role,
      authenticationEntity,
      addressEntity
    );

    if (!customerEntity.isAdult()) {
      return Either.left(new InvalidAgeError());
    }

    const customerModel = await this.customerRepository.add(customerEntity);
    const addressModel = await this.addressRepository.add(addressEntity);
    await this.authenticationRepository.add(authenticationEntity);

    const userResponse = CustomerMapper.modelToResponseDTO(customerModel);
    const addressResponse = AddressMapper.modelToResponseDTO(addressModel);

    const response = {
      ...userResponse,
      ...addressResponse,
    };

    return Either.right(response);
  }
}
