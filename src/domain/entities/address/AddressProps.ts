import { ZipCode } from "../value-objects/zipCode";

export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: ZipCode;
}
