import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { Hasher } from '../contracts/Hasher';
import { CustomerUser } from '../entities/user/customer/CustomerUser';
import {
  addressErrorType,
  authenticationErrorType,
  userValidationErrorType,
} from '../errors/errorTypes';
import { validateUser } from '../helpers/validateUser';
import { AddressFactory } from './AddressFactory';
import { AuthenticationFactory } from './AuthenticationFactory';

export class UserFactory {
  static async create(
    userDTO: CreateUserDTO, hasher: Hasher
  ): Promise<Either<
    userValidationErrorType | addressErrorType | authenticationErrorType,
    CustomerUser
  >> {
    const validUserOrError = validateUser(userDTO);

    if (validUserOrError.isLeft()) {
      return Either.left(validUserOrError.getLeft());
    }

    const validUser = validUserOrError.getRight();

    const { email, role, address, authentication } = userDTO;

    if (role === 'customer') {
      const validAddressOrError = AddressFactory.create(address);
      const validAuthenticationOrError = await AuthenticationFactory.create(
        authentication,
        email,
        hasher
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
