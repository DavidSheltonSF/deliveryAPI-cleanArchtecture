export class Address {
  private readonly _id?: string;
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(
    street: string,
    city: string,
    state: string,
    zipCode: string,
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

  get city(): string {
    return this._city;
  }
  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }
}
