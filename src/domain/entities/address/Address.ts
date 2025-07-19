import { ZipCode } from '../../value-objects/ZipCode';
import { AddressProps } from './AddressProps';

export class Address {
  private readonly _id?: string;
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: ZipCode;

  constructor(
    street: string,
    city: string,
    state: string,
    zipCode: ZipCode,
    id?: string
  ) {
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

  set street(street: string) {
    this._street = street;
  }

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get state(): string {
    return this._state;
  }

  set state(state: string) {
    this._state = state;
  }

  get zipCode(): ZipCode {
    return this._zipCode;
  }

  set zipCode(zipCode: ZipCode) {
    this._zipCode = zipCode;
  }
}
