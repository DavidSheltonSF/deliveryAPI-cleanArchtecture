import { CreateUser } from './interface';
import { CreateUserResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { validateUser } from '../../../helpers/validateCustomer';
import { AddressRepository } from '../../../_ports/AddressRepository';
import { AuthenticationRepository } from '../../../_ports/AuthenticationRepository';
import { CustomerRepository } from '../../../_ports/CustomerRepository';
import { rawAddressToProps } from '../../../../mappers/addressMapper';
import { AddressFactory } from '../../../../domain/factories/AddressFactory';
import { rawAuthenticationToProps } from '../../../../mappers/authenticationMapper';
import { AuthenticationFactory } from '../../../../domain/factories/AuthenticationFactory';
import { HashService } from '../../../../domain/contracts/HashService';
import { HashService } from '../../../../domain/contracts/HashService';
import { UserFactory } from '../../../../domain/factories/UserFactory';
import { UserRole } from '../../../../domain/_enums';
import { rawUserToProps } from '../../../../mappers/customerMappers';
import { InvalidAgeError } from '../../../_errors';

export class CreateUserUseCase implements CreateUser {
  private readonly userRepository: CustomerRepository; // | AdminRepository | DriverRepository...;
  private readonly addressRepository?: AddressRepository;
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(
    userRepository: CustomerRepository,
    authenticationRepository: AuthenticationRepository,
    addressRepository: AddressRepository
  ) {
    this.userRepository = userRepository;
    this.addressRepository = addressRepository;
    this.authenticationRepository = authenticationRepository;
  }

  async execute(
    userData: CreateUserDTO,
    hasher: HashService
  ): Promise<CreateUserResponse> {
    const validation = validateUser(userData);
    if (validation.isLeft()) {
      return Either.left(validation.getLeft());
    }

    const { email, role, address, authentication } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser !== null && existingUser.email === email) {
      return Either.left(
        new DuplicatedDataError(
          `There is already a user with email '${email}'.`
        )
      );
    }

    const userProps = rawUserToProps(userData);

    let addressEntity = undefined;
    if (role !== UserRole.admin) {
      const addressProps = rawAddressToProps(address);
      addressEntity = AddressFactory.create(addressProps);
    }

    const authenticationProps = rawAuthenticationToProps(authentication);
    authentication.password = await hasher.hash(authentication.password);
    const authenticationEntity = AuthenticationFactory.create(
      authenticationProps,
      hasher
    );

    const userEntity = await UserFactory.create(
      userProps,
      role,
      authenticationEntity,
      addressEntity
    );

    if (!userEntity.isAdult()) {
      return Either.left(new InvalidAgeError());
    }

    return Either.right(response);
  }
}
