import { Authentication } from './Authentication';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class AdminUser extends User {
  constructor(props: UserProps, role: string, authentication: Authentication) {
    super(props, role, authentication);
  }
}
