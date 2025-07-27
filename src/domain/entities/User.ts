import { Authentication } from './Authentication';
import { UserProps } from './props/UserProps';

export class User {
  protected readonly _id?: string;
  protected readonly _role: string;
  protected readonly _createdAt?: Date;
  protected props: UserProps;
  protected authentication: Authentication;
  constructor(props: UserProps, role: string, authentication: Authentication) {}

  get id(): string {
    return this._id;
  }
  get username(): string {
    return this.props.username;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get phone(): string {
    return this.props.phone;
  }

  get role(): string {
    return this.role;
  }

  get birthday(): Date {
    return this.props.birthday;
  }

  get passwordHash(): string {
    return this.authentication.passwordHash;
  }
  get sessionToken(): string {
    return this.authentication.sessionToken;
  }
  get createdAt(): Date {
    return this.createdAt;
  }

  activeSession(sessionToken: string) {
    this.authentication.startSession(sessionToken);
  }

  desactiveSession() {
    this.authentication.endSession();
  }

  isAdult(): boolean {
    const birthdayYear = new Date(this.birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthdayYear;
    if (age < 18) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  async passwordIsValid(password: string): Promise<boolean> {
    return await this.authentication.compare(password);
  }
}
