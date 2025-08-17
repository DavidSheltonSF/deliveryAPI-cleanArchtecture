import { UserProps } from '../domain/entities/props/UserProps';
import { Either } from '../shared/either';
import {
  Birthday,
  Cpf,
  Email,
  Name,
  Password,
  Phone,
} from '../domain/value-objects';
import { UserDTO } from '../presentation/dtos/UserDTO';
import { userValidationErrorType } from '../domain/errors/errorTypes';
import { Role } from '../domain/_enums';
import { InvalidRoleError } from '../domain/errors';
import { aggregateEitherValues } from '../utils/aggregateEitherValues';
import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { WithId } from '../utils/types/WithId';
import { HashService } from '../domain/contracts/HashService';

export class UserFactory {
  static async create(
    userData: UserDTO,
    hasher: HashService
  ): Promise<Either<userValidationErrorType, UserProps>> {
    const { firstName, lastName, email, cpf, phone, role, birthday, password } =
      userData;

    if (!(role in Role)) {
      return Either.left(new InvalidRoleError(role));
    }

    const firstNameOrError = Name.create(firstName);
    const lastNameOrError = Name.create(lastName);
    const emailOrError = Email.create(email);
    const cpfOrError = Cpf.create(cpf);
    const phoneOrError = Phone.create(phone);
    const birthdayOrError = Birthday.create(birthday);
    const passwordOrError = await Password.create(password, hasher);

    const validationResult = aggregateEitherValues([
      firstNameOrError,
      lastNameOrError,
      emailOrError,
      cpfOrError,
      phoneOrError,
      birthdayOrError,
      passwordOrError,
    ]);

    if (validationResult.isLeft()) {
      return Either.left(validationResult.getLeft());
    }

    const user = {
      firstName: firstNameOrError.getRight(),
      lastName: lastNameOrError.getRight(),
      email: emailOrError.getRight(),
      cpf: cpfOrError.getRight(),
      phone: phoneOrError.getRight(),
      role: Role[role],
      birthday: birthdayOrError.getRight(),
      passwordHash: passwordOrError.getRight(),
    };

    return Either.right(user);
  }

  static createFromPersistence(userData: WithId<UserModel>): WithId<UserProps> {
    const {
      id,
      firstName,
      lastName,
      email,
      cpf,
      phone,
      role,
      birthday,
      passwordHash,
    } = userData;

    const user = {
      id,
      firstName: Name.createFromPersistence(firstName),
      lastName: Name.createFromPersistence(lastName),
      email: Email.createFromPersistence(email),
      cpf: Cpf.createFromPersistence(cpf),
      phone: Phone.createFromPersistence(phone),
      role: Role[role],
      birthday: Birthday.createFromPersistence(birthday),
      passwordHash: Password.createFromPersistence(passwordHash),
    };

    return user;
  }
}
