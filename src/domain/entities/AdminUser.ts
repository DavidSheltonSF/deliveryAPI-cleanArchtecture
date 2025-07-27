import { Authentication } from './Authentication';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class AdminUser extends User {
  constructor(props: UserProps, authentication: Authentication) {
    super(props, authentication);
  }
}
