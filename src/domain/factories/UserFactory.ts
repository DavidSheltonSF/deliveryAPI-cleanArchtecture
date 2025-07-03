import { Either } from '../../shared/either';
import { IdGenerator } from '../contracts/IdGenerator';
import { Address } from '../entities/address/Address';
import { Authentication } from '../entities/authentication/Authentication';
import { CustomerUser } from '../entities/user/customer/CustomerUser';
import { UserProps } from '../entities/user/UserProps';

export class UserFactory {
  static create(
    idGenerator: IdGenerator,
    userData: UserProps
  ): CustomerUser | null {
    const {
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      address,
      bankAccount,
      authentication,
    } = userData;

    if (role.get() == 'admin') {
      return null;
    }

    if (role.get() == 'restaurantAdmin') {
      return null;
    }

    if (role.get() == 'driver') {
      return null;
    }

    if (role.get() === 'customer') {
      const newAddress = new Address(
        idGenerator.generate(),
        address.street,
        address.city,
        address.state,
        address.zipCode
      );
      const newAuthentication = new Authentication(
        idGenerator.generate(),
        email,
        authentication.passwordHash
      );
      return new CustomerUser(
        idGenerator.generate(),
        username,
        name,
        email,
        cpf,
        phone,
        role,
        birthday,
        newAddress,
        newAuthentication
      );
    }
  }
}
