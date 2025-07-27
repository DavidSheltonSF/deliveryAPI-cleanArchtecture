import { Address } from './Address';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class AdminUser extends User {
  private _address: Address;
  constructor(admin: UserProps) {
    super(admin);
  }

  get address(): Address {
    return this._address;
  }
  set address(address: Address) {
    this._address = address;
  }
}
