import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { userValidationErrorType } from '../errors/errorTypes';
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
import { validateEitherValues } from './validateEitherValues';

export function validateUser(
  userDTO: Partial<CreateUserDTO>
): Either<userValidationErrorType, Map<string, ValueObject>> {
  const { username, name, email, cpf, phone, role, birthday } = userDTO;

  const validations = {
    username: UserName.create(username),
    name: Name.create(name),
    email: Email.create(email),
    cpf: Cpf.create(cpf),
    phone: Phone.create(phone),
    role: Role.create(role),
    birthday: Birthday.create(birthday),
  };

  const validValuesOrError = validateEitherValues(validations);

  if (validValuesOrError.isLeft()) {
    return Either.left(validValuesOrError.getLeft());
  }

  const validValues = validValuesOrError.getRight();

  return Either.right(validValues);
}
