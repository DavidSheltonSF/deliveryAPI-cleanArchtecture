import { Address } from './Address';
import { Authentication } from './Authentication';
import { AddressProps } from './props/AddressProps';
import { AuthenticationProps } from './props/AuthenticationProps';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class CustomerUser extends User {
  private _address: Address;
  constructor(
    props: UserProps,
    role: string,
    address: Address,
    authentication: Authentication
  ) {
    super(props, role, authentication);
    this._address = address;
  }

  get address(): Address {
    return this._address;
  }

  updateProps(userProps: Partial<UserProps>) {
    this.props = {
      ...this.props,
      ...userProps,
    };
  }

  updateAddress(address: Partial<AddressProps>) {
    this._address.update(address);
  }

  updatePassword(passwordHash: string) {
    this.authentication.updatePasswordHash(passwordHash);
  }
}
