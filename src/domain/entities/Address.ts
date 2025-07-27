import { AddressProps } from './props/AddressProps';

export class Address {
  private _id?: string;

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

  update(address: Partial<AddressProps>) {
    this.props = {
      ...this.props,
      ...address,
    };
  }
}
