import { Either } from '../../shared/either';
import { RawUserProps } from '../entities/rawProps/RawUserProps';
import { UserProps } from '../entities/props/UserProps';
import { userValidationErrorType } from '../errors/errorTypes';
import { Birthday, Cpf, Email, Name, Phone, UserName } from '../value-objects';

type UserValidation = {
  usernameOrError: Either<Error, UserName>;
  nameOrError: Either<Error, Name>;
  emailOrError: Either<Error, Email>;
  cpfOrError: Either<Error, Cpf>;
  phoneOrError: Either<Error, Phone>;
  birthdayOrError: Either<Error, Birthday>;
};

export class UserPropsBuilder {
  static buildUserProps(
    userData: RawUserProps
  ): Either<userValidationErrorType, UserProps> {
    const { username, name, email, cpf, phone, birthday } = userData;

    const usernameOrError = UserName.create(username);
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const cpfOrError = Cpf.create(cpf);
    const phoneOrError = Phone.create(phone);
    const birthdayOrError = Birthday.create(birthday);

    const validationResult = this.validate({
      usernameOrError,
      nameOrError,
      emailOrError,
      cpfOrError,
      phoneOrError,
      birthdayOrError,
    });

    if (validationResult.isLeft()) {
      return Either.left(validationResult.getLeft());
    }

    const userProps = {
      username: usernameOrError.getRight(),
      name: nameOrError.getRight(),
      email: emailOrError.getRight(),
      cpf: cpfOrError.getRight(),
      phone: phoneOrError.getRight(),
      birthday: birthdayOrError.getRight(),
    };

    return Either.right(userProps);
  }

  private static validate(
    validation: UserValidation
  ): Either<userValidationErrorType, null> {
    for (const value of Object.values(validation)) {
      if (value.isLeft()) {
        return Either.left(value.getLeft());
      }
    }
    return Either.right(null);
  }
}
