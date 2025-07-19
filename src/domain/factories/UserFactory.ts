import { Either } from '../../shared/either';
import { CustomerUser } from '../entities/user/customer/CustomerUser';
import { UserProps } from '../entities/user/UserProps';
import { AddressFactory } from './AddressFactory';
import { AuthenticationFactory } from './AuthenticationFactory';

export class UserFactory {
  static create(userProps: UserProps): CustomerUser | null {
    if (userProps.role === 'customer') {
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
      } = userProps;

      const addressEntity = AddressFactory.create(address);
      const authenticationEntity = AuthenticationFactory.create(authentication, email);

      return new CustomerUser(
        username,
        name,
        email,
        cpf,
        phone,
        role,
        birthday,
        addressEntity,
        authenticationEntity
      );
    }
  }
}
