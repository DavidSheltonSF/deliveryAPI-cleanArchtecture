import { CustomerModel } from '../../infrastructure/models/mongodb/CustomerModel';
import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { UserRole } from '../_enums';
import { Hasher } from '../contracts/Hasher';
import { Address } from '../entities/Address';
import { AdminUser } from '../entities/AdminUser';
import { Authentication } from '../entities/Authentication';
import { CustomerUser } from '../entities/CustomerUser';
import { UserProps } from '../entities/props/UserProps';
import { AddressFactory } from './AddressFactory';
import { AuthenticationFactory } from './AuthenticationFactory';

export class UserFactory {
  static async create(user: UserProps): Promise<CustomerUser | AdminUser> {
    const { email, role, address, authentication } = user;

    let createdUser = undefined;
    switch (role) {
      case UserRole.customer:
        createdUser = new CustomerUser(user);
        break;
      case UserRole.admin:
        createdUser = new AdminUser(user);
        break;
    }

    return createdUser;
  }
}
