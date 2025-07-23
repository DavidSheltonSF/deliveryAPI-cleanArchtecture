import { Address } from './Address';
import { Authentication } from './Authentication';
import { User } from '../User';

export class CustomerUser extends User {
  private _address: Address;
  constructor(
    username: string,
    name: string,
    email: string,
    cpf: string,
    phone: string,
    role: string,
    birthday: Date,
    address: Address,
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
    this._address = address;
  }

  get address(): Address {
    return this._address;
  }
}
