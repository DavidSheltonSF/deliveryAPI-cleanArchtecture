import {
  Phone,
  Birthday,
  UserName,
  Name,
  Role,
  Email,
  Cpf,
} from '../../../value-objects';
import { Address } from '../../address/Address';
import { Authentication } from '../../authentication/Authentication';
import { User } from '../User';

export class Customer extends User {
  private _phone: Phone;
  private _birthday: Birthday;
  private _address: Address;

  constructor(
    id: string,
    username: UserName,
    name: Name,
    email: Email,
    cpf: Cpf,
    role: Role,
    phone: Phone,
    birthday: Birthday,
    address: Address,
    authentication: Authentication
  ) {
    super(id, username, name, email, cpf, role, authentication);
    this._phone = phone;
    this._birthday = birthday;
    this._address = address;
  }

  get phone(): Phone {
    return this._phone;
  }

  get birthday(): Birthday {
    return this._birthday;
  }

  get address(): Address {
    return this._address;
  }

  isAdult(): boolean {
    if (this.birthday.getAge() < 18) {
      return false;
    }
    return true;
  }
}
