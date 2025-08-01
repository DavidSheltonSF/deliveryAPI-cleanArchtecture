import { Role } from '../_enums';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { AddressProps } from './props/AddressProps';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class CustomerUser extends User {
  private _address: Address;
  private constructor(
    props: UserProps,
    address: Address,
    authentication: Authentication
  ) {
    super(props, Role.customer, authentication);
    this._address = address;
  }

  static create(
    props: UserProps,
    address: Address,
    authentication: Authentication
  ): CustomerUser {
    return new CustomerUser(props, address, authentication);
  }

  get address(): Address {
    return this._address;
  }

  updateAddress(address: Partial<AddressProps>) {
    this._address.update(address);
  }
}
