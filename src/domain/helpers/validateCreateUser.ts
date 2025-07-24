import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { UserProps } from '../entities/props/UserProps';
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
import { validateAddress } from './validateAddress';
import { validateAuthentication } from './validateAuthentication';
import { validateEitherValues } from './validateEitherValues';

export function validateCreateUser(
  userDTO: CreateUserDTO
): Either<userValidationErrorType, UserProps> {
  const {
    username,
    name,
    email,
    cpf,
    phone,
    role,
    birthday,
    address,
    authentication,
  } = userDTO;

  const simpleFieldsValidations = {
    username: UserName.create(username),
    name: Name.create(name),
    email: Email.create(email),
    cpf: Cpf.create(cpf),
    phone: Phone.create(phone),
    role: Role.create(role),
    birthday: Birthday.create(birthday),
  };

  const simpleFieldsOrError = validateEitherValues(simpleFieldsValidations);

  if (simpleFieldsOrError.isLeft()) {
    return Either.left(simpleFieldsOrError.getLeft());
  }

  const simpleFields = simpleFieldsOrError.getRight();

  const addressOrError = validateAddress(address);
  const authenticationOrError = validateAuthentication(authentication, email);

  if (addressOrError.isLeft()) {
    return Either.left(addressOrError.getLeft());
  }

  if (authenticationOrError.isLeft()) {
    return Either.left(authenticationOrError.getLeft());
  }

  const validAddress = addressOrError.getRight();
  const validAuthentication = authenticationOrError.getRight();

  const userProps: UserProps = {
    username: simpleFields.get('username') as UserName,
    name: simpleFields.get('name') as Name,
    email: simpleFields.get('email') as Email,
    cpf: simpleFields.get('cpf') as Cpf,
    role: simpleFields.get('role') as Role,
    phone: simpleFields.get('phone') as Phone,
    birthday: simpleFields.get('birthday') as Birthday,
    addresss: validAddress,
    authentication: validAuthentication,
  };

  return Either.right(userProps);
}
