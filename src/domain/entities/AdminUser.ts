import { Address } from './Address';
import { Authentication } from './Authentication';
import { User } from './User';

export class AdminUser extends User {
  private _address: Address;
  constructor(
    username: string,
    name: string,
    email: string,
    cpf: string,
    phone: string,
    role: string,
    birthday: Date,
    authentication: Authentication,
    id?: string
  ) {
    super(
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      authentication,
      id
    );
  }

  get address(): Address {
    return this._address;
  }
  set address(address: Address) {
    this._address = address;
  }
}
