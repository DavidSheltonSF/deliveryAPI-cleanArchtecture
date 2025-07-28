import { UserRole } from '../_enums';
import { Address } from '../entities/Address';
import { AdminUser } from '../entities/AdminUser';
import { Authentication } from '../entities/Authentication';
import { CustomerUser } from '../entities/CustomerUser';
import { UserProps } from '../entities/props/UserProps';

export class UserFactory {
  static async create(
    userProps: UserProps,
    role: string,
    authentication: Authentication,
    address?: Address
  ): Promise<CustomerUser | AdminUser> {
    const { email } = userProps;

    let createdUser = undefined;
    switch (role) {
      case UserRole.customer:
        createdUser = new CustomerUser(
          userProps,
          role,
          address,
          authentication
        );
        break;

      case UserRole.admin:
        createdUser = new AdminUser(userProps, role, authentication);
        break;

      default:
        throw Error('Invalid role.');
    }

    return createdUser;
  }
}
