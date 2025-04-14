import { Either } from "../../../../shared/either";
import { InvalidAddressError } from "../../_errors/invalid-address";
import { Address } from "../_interfaces";

export class AddressValidator {
  private readonly address: Address;

  constructor(address: Address){
    this.address = address;
    Object.freeze(this);
  };

  static validate(address: Address): Boolean{

    const zipCodeRegex = /^\d{5}\-?\d{3}$/;

    if (!address.street || !address.city || !address.state || !address.zipCode) {
      return false;
    }

    if (!address.zipCode.match(zipCodeRegex)){
      return false;
    }
    
    return true;
  }

  static create(address: Address): Either<InvalidAddressError, AddressValidator> {
    if (!this.validate(address)) {
      return Either.left(new InvalidAddressError(JSON.stringify(address)));
    }

    return Either.right(new AddressValidator(address));
  }

  get(): Address {
    return this.address;
  }
}