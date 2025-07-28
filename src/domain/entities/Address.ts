import { Either } from '../../shared/either';
import { PropertyAlreadySetError } from '../errors';
import { AddressProps } from './props/AddressProps';

export class Address {
  private _id?: string;
  private _createdAt?: Date;

  constructor(private props: AddressProps) {}

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
    return this.props.zipCode;
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

  setCreatedAt(date: Date): Either<PropertyAlreadySetError, Date> {
    if (this._createdAt !== undefined) {
      return Either.left(new PropertyAlreadySetError('createdAt'));
    }
    this._createdAt = date;
    return Either.right(this._createdAt);
  }

  update(address: Partial<AddressProps>) {
    this.props = {
      ...this.props,
      ...address,
    };
  }
}
