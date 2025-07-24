import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { Hasher } from '../contracts/Hasher';
import { CustomerUser } from '../entities/CustomerUser';
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
    userDTO: CreateUserDTO,
    hasher: Hasher
  ): Promise<
    Either<
      userValidationErrorType | addressErrorType | authenticationErrorType,
      CustomerUser
    >
  > {
    const validUserOrError = validateUser(userDTO);

    if (validUserOrError.isLeft()) {
      return Either.left(validUserOrError.getLeft());
    }

    const validUser = validUserOrError.getRight();

    const { email, role, address, authentication } = userDTO;

    if (role === 'customer') {
      const addressEntity = AddressFactory.create(address);
      const authenticationEntity = await AuthenticationFactory.create(
        authentication,
        email,
        hasher
      );

      const customer = new CustomerUser(
        validUser.get('username').getValue(),
        validUser.get('name').getValue(),
        validUser.get('email').getValue(),
        validUser.get('cpf').getValue(),
        validUser.get('phone').getValue(),
        validUser.get('role').getValue(),
        validUser.get('birthday').getValue(),
        addressEntity,
        authenticationEntity
      );

      return Either.right(customer);
    }
  }
}
