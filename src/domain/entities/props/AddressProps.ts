import { AddressZipCode } from "../../value-objects";

export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: AddressZipCode;
}
