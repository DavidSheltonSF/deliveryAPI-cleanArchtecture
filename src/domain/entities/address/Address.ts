import { ZipCode } from '../../value-objects/ZipCode';

export class Address {
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: ZipCode;

  constructor(street: string, city: string, state: string, zipCode: ZipCode) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
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
