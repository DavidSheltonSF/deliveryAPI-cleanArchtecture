import { WithId, Document } from 'mongodb';
import { CustomerModel } from '../../../models/mongodb/CustomerModel';
import { stringToObjectId } from '../helpers/stringToObjectId';
import { CustomerUser } from '../../../../domain/entities/user/customer/CustomerUser';
import { UserDTO } from '../../../../presentation/dtos/UserDTO';
import { UserProps } from '../../../../domain/entities/user/UserProps';
import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
  Role,
  UserName,
  ZipCode,
} from '../../../../domain/value-objects';
import { Address } from '../../../../domain/entities/address/Address';
import { Either } from '../../../../shared/either';
import { InvalidZipCodeError } from '../../../../domain/errors/InvalidZipCodeError';
import { AddressFactory } from '../../../../domain/factories/AddressFactory';
import { rawAddressToProps } from './addressMapper';
import { Hasher } from '../../../../domain/contracts/Hasher';
import { rawAuthenticationToProps } from './authenticationMapper';

export function persistenceToCustomerModel(
  document: WithId<Document>
): CustomerModel {
  if (document === null) {
    throw Error('No document provided from persistence.');
  }

  return {
    _id: document._id,
    username: document.username,
    name: document.name,
    email: document.email,
    cpf: document.cpf,
    phone: document.phone,
    role: document.role,
    birthday: document.birthday,
    createdAt: document.createdAt,
  };
}

export function entityToCustomerModel(customer: CustomerUser): CustomerModel {
  if (document === null) {
    throw Error('No entity provided.');
  }

  return {
    _id: stringToObjectId(customer.id),
    username: customer.username.get(),
    name: customer.name.get(),
    email: customer.email.get(),
    cpf: customer.cpf.get(),
    phone: customer.phone.get(),
    role: customer.role.get(),
    birthday: customer.birthday.get(),
    createdAt: customer.createdAt,
  };
}

export async function rawUserToCustomerProps(
  userDTO: UserDTO,
  hasher?: Hasher
): Promise<Either<InvalidZipCodeError, UserProps>> {
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

  const validations = {
    username: UserName.create(username),
    name: Name.create(name),
    email: Email.create(email),
    cpf: Cpf.create(cpf),
    phone: Phone.create(phone),
    role: Role.create(role),
    birthday: Birthday.create(new Date(birthday)),
  };

  const validValueObjects = {}

  for (const [k, v] of Object.entries(validations)) {
    if (v.isLeft()) {
      return Either.left(v.getLeft());
    }
    validValueObjects[k] = v.getRight();

  }

  
  const authOrError = await rawAuthenticationToProps(
    authentication,
    email,
    hasher
  );
  const addressOrError = rawAddressToProps(address);

  if (authOrError.isLeft()) {
    return Either.left(authOrError.getLeft());
  }
  if (addressOrError.isLeft()) {
    return Either.left(addressOrError.getLeft());
  }

  console.log('FLAG')
  const authenticationProps = authOrError.getRight();
  const addressProps = addressOrError.getRight();

  const customerProps = {
    username: validValueObjects['username'],
    name: validValueObjects['name'],
    email: validValueObjects['email'],
    cpf: validValueObjects['cpf'],
    phone: validValueObjects['phone'],
    role: validValueObjects['role'],
    birthday: validValueObjects['birthday'],
    address: addressProps,
    authentication: authenticationProps,
  };

  return Either.right(customerProps);
}
