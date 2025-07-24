import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { Hasher } from '../contracts/Hasher';
import { Address } from '../entities/Address';
import { Authentication } from '../entities/Authentication';
import { CustomerUser } from '../entities/CustomerUser';
import { UserProps } from '../entities/props/UserProps';
import {
  addressErrorType,
  authenticationErrorType,
  userValidationErrorType,
} from '../errors/errorTypes';
import { validateCreateUser } from '../helpers/validateCreateUser';
import { AddressFactory } from './AddressFactory';
import { AuthenticationFactory } from './AuthenticationFactory';

export class UserFactory {
  static async create(
    userDTO: CreateUserDTO,
    hasher: Hasher
  ): Promise<
    Either<
      userValidationErrorType | addressErrorType | authenticationErrorType,
      CustomerUser
    >
  > {
    const userPropsOrError = validateCreateUser(userDTO);

    if (userPropsOrError.isLeft()) {
      return Either.left(userPropsOrError.getLeft());
    }

    const userProps = userPropsOrError.getRight();

    const { email, role, address, authentication } = userDTO;

    const authenticationEntity = await AuthenticationFactory.create(
      authentication,
      email,
      hasher
    );

    if (role === 'customer') {
      const addressEntity = AddressFactory.create(address);
      const customer = UserFactory.createCustomer(
        userProps,
        addressEntity,
        authenticationEntity
      );

      return Either.right(customer)
    }
  }

  private static createCustomer(
    userProps: UserProps,
    addressEntity: Address,
    authenticationEntity: Authentication
  ): CustomerUser {
    const customer = new CustomerUser(
      userProps.username.getValue(),
      userProps.name.getValue(),
      userProps.email.getValue(),
      userProps.cpf.getValue(),
      userProps.phone.getValue(),
      userProps.role.getValue(),
      userProps.birthday.getValue(),
      addressEntity,
      authenticationEntity
    );

    return customer;
  }
}
