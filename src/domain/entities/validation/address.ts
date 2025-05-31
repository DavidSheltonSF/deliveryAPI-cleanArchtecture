import { Either } from "../../../shared/either";
import { InvalidAddressError } from "../errors/InvalidAddressError";
import { AddressProps } from "./_interfaces";

export class Address {
  private readonly address: AddressProps;

  constructor(address: AddressProps){
    this.address = address;
    Object.freeze(this);
  };

  static validate(address: AddressProps): Boolean{

    const zipCodeRegex = /^\d{5}\-?\d{3}$/;

    if (!address || !address.street || !address.city || !address.state || !address.zipCode) {
      return false;
    }

    if (!address.zipCode.match(zipCodeRegex)){
      return false;
    }
    
    return true;
  }

  static create(address: AddressProps): Either<InvalidAddressError, Address> {
    if (!this.validate(address)) {
      return Either.left(new InvalidAddressError(JSON.stringify(address)));
    }

    return Either.right(new Address(address));
  }

  get(): AddressProps {
    return this.address;
  }
}