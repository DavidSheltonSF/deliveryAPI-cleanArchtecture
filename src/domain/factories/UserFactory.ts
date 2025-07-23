import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { CustomerUser } from '../entities/user/customer/CustomerUser';
import {
  addressErrorType,
  authenticationErrorType,
  userValidationErrorType,
} from '../errors/errorTypes';
import { validateUser } from '../helpers/validateUser';
import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
  Role,
  UserName,
} from '../value-objects';
import { ValueObject } from '../value-objects/ValueObject';
import { AddressFactory } from './AddressFactory';
import { AuthenticationFactory } from './AuthenticationFactory';

export class UserFactory {
  static create(
    userDTO: CreateUserDTO
  ): Either<
    userValidationErrorType | addressErrorType | authenticationErrorType,
    CustomerUser
  > {
    const validUserOrError = validateUser(userDTO);

    if (validUserOrError.isLeft()) {
      return Either.left(validUserOrError.getLeft());
    }

    const validUser = validUserOrError.getRight();

    const { email, role, address, authentication } = userDTO;

    if (role === 'customer') {
      const validAddressOrError = AddressFactory.create(address);
      const validAuthenticationOrError = AuthenticationFactory.create(
        authentication,
        email
      );

      if (validAddressOrError.isLeft()) {
        return Either.left(validAddressOrError.getLeft());
      }

      if (validAuthenticationOrError.isLeft()) {
        return Either.left(validAuthenticationOrError.getLeft());
      }

      const validAddress = validAddressOrError.getRight();
      const validAuthentication = validAuthenticationOrError.getRight();

      const customer = new CustomerUser(
        validUser.get('username').getValue(),
        validUser.get('name').getValue(),
        validUser.get('email').getValue(),
        validUser.get('cpf').getValue(),
        validUser.get('phone').getValue(),
        validUser.get('role').getValue(),
        validUser.get('birthday').getValue(),
        validAddress,
        validAuthentication
      );

      return Either.right(customer);
    }
  }
}
