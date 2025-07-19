import { Birthday, Cpf, Email, Name, Phone, Role, UserName } from '../../../value-objects';
import { Address } from '../../address/Address';
import { Authentication } from '../../authentication/Authentication';
import { User } from '../User';

export class CustomerUser extends User {
  private _address: Address;
  constructor(
    username: UserName,
    name: Name,
    email: Email,
    cpf: Cpf,
    phone: Phone,
    role: Role,
    birthday: Birthday,
    address: Address,
    authentication: Authentication,
    id?: string
  ) {
    super({
      id: id,
      username: username,
      name: name,
      email: email,
      cpf: cpf,
      phone: phone,
      role: role,
      birthday: birthday,
      authentication: authentication,
    });
    this._address = address;
  }

  get address(): Address {
    return this._address;
  }
}
