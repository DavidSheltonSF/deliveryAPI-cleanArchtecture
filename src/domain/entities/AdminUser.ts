import {
  Phone,
  Birthday,
  UserName,
  Name,
  Role,
  Email,
  Cpf,
} from '../../../value-objects';
import { Authentication } from '../../Authentication';
import { User } from '../User';

export class AdminUser extends User {
  constructor(
    id: string,
    username: UserName,
    name: Name,
    email: Email,
    cpf: Cpf,
    phone: Phone,
    role: Role,
    birthday: Birthday,
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
      authentication
    );
  }
}
