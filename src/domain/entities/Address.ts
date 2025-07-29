import { AddressModel } from '../../infrastructure/models/mongodb/AddressModel';
import { Either } from '../../shared/either';
import { PropertyAlreadySetError } from '../errors';
import { addressErrorType } from '../errors/errorTypes';
import { buildAddressProps } from '../helpers/buildAddressProps';
import { AddressZipCode } from '../value-objects';
import { AddressProps } from './props/AddressProps';
import { RawAddressProps } from './rawProps/RawAddressProps';

export class Address {
  private _id?: string;
  private props: AddressProps;
  private _createdAt?: Date;

  private constructor(props: AddressProps, createdAt?: Date) {
    this.props = props;
    this._createdAt = createdAt ?? new Date();
  }

  static create(
    props: RawAddressProps
  ): Either<addressErrorType, Address> {
    const validPropsOrError = buildAddressProps(props);

    if (validPropsOrError.isLeft()) {
      return Either.left(validPropsOrError.getLeft());
    }

    const validProps = validPropsOrError.getRight();

    return Either.right(new Address(validProps));
  }

  static createFromPersistence(data: AddressModel): Address {
    const { _id, userId, street, city, state, zipCode, createdAt } = data;

    const id = _id.toString();
    const props = {
      userId: userId.toString(),
      street,
      city,
      state,
      zipCode: AddressZipCode.createFromPersistence(zipCode),
    };

    const address = new Address(props, createdAt);
    address._id = id;

    return address;
  }

  get id(): string {
    return this._id;
  }

  get street(): string {
    return this.props.street;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get zipCode(): string {
    return this.props.zipCode.getValue();
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  setId(id: string): Either<PropertyAlreadySetError, string> {
    if (this._id !== undefined) {
      return Either.left(new PropertyAlreadySetError('id'));
    }
    this._id = id;
    return Either.right(this._id);
  }

  update(address: Partial<AddressProps>) {
    this.props = {
      ...this.props,
      ...address,
    };
  }
}
