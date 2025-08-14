import { WithId } from '../utils/types/WithId';
import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { stringToObjectId } from '../infrastructure/repositories/mongodb/helpers/stringToObjectId';
import { CreateUserDTO } from '../presentation/dtos/CreateUserDTO';
import { UserProps } from '../domain/entities/props/UserProps';
import { UserResponseDTO } from '../application/useCaseDtos/UserResponseDTO';
import { Either } from '../shared/either';
import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
  UserName,
} from '../domain/value-objects';
import { validateUserProps } from '../domain/helpers/validateUserProps';
import { UserDTO } from '../presentation/dtos/UserDTO';
import { userValidationErrorType } from '../domain/errors/errorTypes';
import { Role } from '../domain/_enums';

export class CustomerMapper {
  static rawToProps(
    userData: UserDTO
  ): Either<userValidationErrorType, UserProps> {
    const { firstName, lastName, email, cpf, phone, birthday } = userData;

    const firstNameOrError = Name.create(firstName);
    const lastNameOrError = Name.create(lastName);
    const emailOrError = Email.create(email);
    const cpfOrError = Cpf.create(cpf);
    const phoneOrError = Phone.create(phone);
    const birthdayOrError = Birthday.create(birthday);

    const validationResult = validateUserProps({
      firstNameOrError,
      lastNameOrError,
      emailOrError,
      cpfOrError,
      phoneOrError,
      birthdayOrError,
    });

    if (validationResult.isLeft()) {
      return Either.left(validationResult.getLeft());
    }

    const userProps = {
      firstName: firstNameOrError.getRight(),
      lastName: lastNameOrError.getRight(),
      email: emailOrError.getRight(),
      cpf: cpfOrError.getRight(),
      phone: phoneOrError.getRight(),
      role: Role.customer,
      birthday: birthdayOrError.getRight(),
    };

    return Either.right(userProps);
  }

  static propsToPersistence(customer: UserProps): UserModel {
    const { firstName, lastName, email, cpf, phone, role, birthday } = customer;

    return {
      firstName: firstName.getValue(),
      lastName: lastName.getValue(),
      email: email.getValue(),
      cpf: cpf.getValue(),
      phone: phone.getValue(),
      role,
      birthday: birthday.getValue(),
      createdAt: new Date(),
    };
  }

  static persistenceToProps(customer: WithId<UserModel>): WithId<UserProps> {
    const { id, firstName, lastName, email, cpf, phone, birthday } = customer;

    return {
      id,
      firstName: Name.createFromPersistence(firstName),
      lastName: Name.createFromPersistence(lastName),
      email: Email.createFromPersistence(email),
      cpf: Cpf.createFromPersistence(cpf),
      phone: Phone.createFromPersistence(phone),
      role: Role.customer,
      birthday: Birthday.createFromPersistence(birthday),
    };
  }
}
