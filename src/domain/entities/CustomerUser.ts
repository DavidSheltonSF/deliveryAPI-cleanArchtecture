import { UserModel } from '../../infrastructure/models/mongodb/UserModel';
import { Role } from '../_enums';
import { Birthday, Cpf, Email, Name, Phone, UserName } from '../value-objects';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { AddressProps } from './props/AddressProps';
import { UserProps } from './props/UserProps';
import { User } from './User';

export class CustomerUser extends User {
  private _address: Address;
  private constructor(
    props: UserProps,
    address: Address,
    authentication: Authentication,
    createdAt?: Date
  ) {
    super(props, Role.customer, authentication, createdAt);
    this._address = address;
  }

  static create(
    props: UserProps,
    address: Address,
    authentication: Authentication
  ): CustomerUser {
    return new CustomerUser(props, address, authentication);
  }

  static createFromPersistence(
    data: UserModel,
    address: Address,
    authentication: Authentication
  ): CustomerUser {
    const { _id, username, name, email, cpf, phone, birthday, createdAt } =
      data;

    const props = {
      username: UserName.createFromPersistence(username),
      name: Name.createFromPersistence(name),
      email: Email.createFromPersistence(email),
      cpf: Cpf.createFromPersistence(cpf),
      phone: Phone.createFromPersistence(phone),
      birthday: Birthday.createFromPersistence(birthday),
    };

    const customer = new CustomerUser(
      props,
      address,
      authentication,
      createdAt
    );
    customer._id = _id;
    return customer;
  }

  get address(): Address {
    return this._address;
  }

  updateAddress(address: Partial<AddressProps>) {
    this._address.update(address);
  }
}
