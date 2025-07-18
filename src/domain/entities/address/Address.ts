import { ZipCode } from '../../value-objects/ZipCode';
import { AddressProps } from './AddressProps';

export class Address {
  private readonly _id?: string;
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: ZipCode;

  constructor(addressData: AddressProps) {
    this._id = addressData.id;
    this._street = addressData.street;
    this._city = addressData.city;
    this._state = addressData.state;
    this._zipCode = addressData.zipCode;
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
