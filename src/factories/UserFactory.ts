import { UserProps } from '../domain/entities/props/UserProps';
import { Either } from '../shared/either';
import { Birthday, Cpf, Email, Name, Phone } from '../domain/value-objects';
import { UserDTO } from '../presentation/dtos/UserDTO';
import { userValidationErrorType } from '../domain/errors/errorTypes';
import { Role } from '../domain/_enums';
import { InvalidRoleError } from '../domain/errors';
import { aggregateEitherValues } from '../utils/aggregateEitherValues';
import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { WithId } from '../utils/types/WithId';

export class UserFactory {
  static create(userData: UserDTO): Either<userValidationErrorType, UserProps> {
    const { firstName, lastName, email, cpf, phone, role, birthday } = userData;

    if (!(role in Role)) {
      return Either.left(new InvalidRoleError(role));
    }

    const firstNameOrError = Name.create(firstName);
    const lastNameOrError = Name.create(lastName);
    const emailOrError = Email.create(email);
    const cpfOrError = Cpf.create(cpf);
    const phoneOrError = Phone.create(phone);
    const birthdayOrError = Birthday.create(birthday);

    const validationResult = aggregateEitherValues([
      firstNameOrError,
      lastNameOrError,
      emailOrError,
      cpfOrError,
      phoneOrError,
      birthdayOrError,
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
    };

    return Either.right(user);
  }

  static createFromPersistence(userData: WithId<UserModel>): UserProps {
    const { id, firstName, lastName, email, cpf, phone, role, birthday } =
      userData;

    const user = {
      id,
      firstName: Name.createFromPersistence(firstName),
      lastName: Name.createFromPersistence(lastName),
      email: Email.createFromPersistence(email),
      cpf: Cpf.createFromPersistence(cpf),
      phone: Phone.createFromPersistence(phone),
      role: Role[role],
      birthday: Birthday.createFromPersistence(birthday),
    };

    return user;
  }
}
