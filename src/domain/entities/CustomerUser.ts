import { Either } from '../../shared/either';
import { Role } from '../_enums';
import { userValidationErrorType } from '../errors/errorTypes';
import { buildUserProps } from '../helpers/buildUserProps';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { AddressProps } from './props/AddressProps';
import { UserProps } from './props/UserProps';
import { RawUserProps } from './rawProps/RawUserProps';
import { User } from './User';

export class CustomerUser extends User {
  private _address: Address;
  private constructor(
    props: UserProps,
    role: Role,
    address: Address,
    authentication: Authentication
  ) {
    super(props, role, authentication);
    this._address = address;
  }

  static create(
    props: RawUserProps,
    role: Role,
    address: Address,
    authentication: Authentication
  ): Either<userValidationErrorType, CustomerUser> {
    const validPropsOrError = buildUserProps(props);

    if (validPropsOrError.isLeft()) {
      return Either.left(validPropsOrError.getLeft());
    }

    const validProps = validPropsOrError.getRight();

    const customer = new CustomerUser(
      validProps,
      role,
      address,
      authentication
    );

    return Either.right(customer);
  }

  get address(): Address {
    return this._address;
  }

  updateAddress(address: Partial<AddressProps>) {
    this._address.update(address);
  }
}
