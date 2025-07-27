import { Address } from './Address';
import { CustomerProps } from './props/CustomerProps';
import { User } from './User';

export class CustomerUser extends User {
  private _address: Address;
  constructor(customer: CustomerProps) {
    super(customer);
    this._address = customer.addresss;
  }

  get address(): Address {
    return this._address;
  }
}
