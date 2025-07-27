import { Address } from './Address';
import { Authentication } from './Authentication';
import { AdminUserProps } from './props/AdminUserProps';
import { User } from './User';

export class AdminUser extends User {
  private _address: Address;
  constructor(admin: AdminUserProps) {
    super(admin);
  }

  get address(): Address {
    return this._address;
  }
  set address(address: Address) {
    this._address = address;
  }
}
