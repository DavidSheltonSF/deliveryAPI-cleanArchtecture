import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { UserRole } from '../_enums';
import { Hasher } from '../contracts/Hasher';
import { Address } from '../entities/Address';
import { AdminUser } from '../entities/AdminUser';
import { Authentication } from '../entities/Authentication';
import { CustomerUser } from '../entities/CustomerUser';
import { AddressFactory } from './AddressFactory';
import { AuthenticationFactory } from './AuthenticationFactory';

export class UserFactory {
  static async create(
    userDTO: CreateUserDTO,
    hasher: Hasher
  ): Promise<CustomerUser> {
    const { email, role, address, authentication } = userDTO;

    const authenticationEntity = await AuthenticationFactory.create(
      authentication,
      email,
      hasher
    );

    let user = undefined;

    switch (role) {
      case UserRole.customer:
        const addressEntity = AddressFactory.create(address);
        user = UserFactory.createCustomer(
          userDTO,
          addressEntity,
          authenticationEntity
        );

        break;
      case UserRole.admin:
        user = UserFactory.createAdmin(userDTO, authenticationEntity);
        break;
    }

    return user;
  }

  private static createCustomer(
    userDTO: CreateUserDTO,
    addressEntity: Address,
    authenticationEntity: Authentication
  ): CustomerUser {
    const customer = new CustomerUser(
      userDTO.username,
      userDTO.name,
      userDTO.email,
      userDTO.cpf,
      userDTO.phone,
      userDTO.role,
      new Date(userDTO.birthday),
      addressEntity,
      authenticationEntity
    );

    return customer;
  }

  private static createAdmin(
    userDTO: CreateUserDTO,
    authenticationEntity: Authentication
  ): AdminUser {
    const customer = new AdminUser(
      userDTO.username,
      userDTO.name,
      userDTO.email,
      userDTO.cpf,
      userDTO.phone,
      userDTO.role,
      new Date(userDTO.birthday),
      authenticationEntity
    );

    return customer;
  }
}
