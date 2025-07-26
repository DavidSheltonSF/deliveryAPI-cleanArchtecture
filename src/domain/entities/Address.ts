import { AddressProps } from './props/AddressProps';

export class Address {
  private readonly _id?: string;
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(address: AddressProps) {
    const { id, street, city, state, zipCode } = address;
    this._id = id;
    this._street = street;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
  }

  get id(): string {
    return this._id;
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  update(address: Partial<AddressProps>) {
    const { street, city, state, zipCode } = address;

    if (street !== undefined) {
      this._street = street;
    }

    if (city !== undefined) {
      this._city = city;
    }

    if (state !== undefined) {
      this._state !== undefined;
    }

    if (zipCode !== undefined) {
      this._zipCode = zipCode;
    }
  }
}
