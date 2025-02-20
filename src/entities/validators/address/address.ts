import { Either } from "../../../shared/either";
import { InvalidAddressError } from "../../_errors/invalid-address";

interface UserAddress {
  street: string,
  city: string,
  state: string,
  zipCode: string
}

export class Address {
  private readonly address: UserAddress;

  constructor(address: UserAddress){
    this.address = address;
    Object.freeze(this);
  };

  static validate(address: UserAddress): Boolean{

    const zipCodeRegex = /^\d{5}\-?\d{3}$/;

    if (!address.street || !address.city || !address.state || !address.zipCode) {
      return false;
    }

    if (!address.zipCode.match(zipCodeRegex)){
      return false;
    }
    
    return true;
  }

  static create(address: UserAddress): Either<InvalidAddressError, Address> {
    if (!this.validate(address)) {
      return Either.left(new InvalidAddressError(JSON.stringify(address)));
    }

    return Either.right(new Address(address));
  }

  get(): UserAddress {
    return this.address;
  }
}