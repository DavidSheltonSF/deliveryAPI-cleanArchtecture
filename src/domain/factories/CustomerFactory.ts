import { Address } from '../entities/Address';
import { Authentication } from '../entities/Authentication';
import { CustomerUser } from '../entities/CustomerUser';
import { UserProps } from '../entities/props/UserProps';

export class CustomerFactory {
  static async create(
    CustomerProps: UserProps,
    role: string,
    authentication: Authentication,
    address: Address
  ): Promise<CustomerUser> {

    const createdCustomer = new CustomerUser(
      CustomerProps,
      role,
      address,
      authentication
    );

    return createdCustomer;
  }
}
