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
  constructor(
    id: string,
    username: UserName,
    name: Name,
    email: Email,
    cpf: Cpf,
    phone: Phone,
    role: Role,
    birthday: Birthday,
    address: Address,
    authentication: Authentication
  ) {
    super(
      id,
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      address,
      authentication
    );
  }

  isAdult(): boolean {
    if (this.birthday.getAge() < 18) {
      return false;
    }
    return true;
  }
}
