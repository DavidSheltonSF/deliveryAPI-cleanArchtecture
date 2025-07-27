import { Address } from './Address';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class CustomerUser extends User {
  private _address: Address;
  constructor(customer: UserProps) {
    super(customer);
    this._address = customer.address;
  }

  get address(): Address {
    return this._address;
  }
}
