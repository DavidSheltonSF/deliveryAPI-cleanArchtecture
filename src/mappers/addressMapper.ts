import { AddressProps } from '../domain/entities/props/AddressProps';
import { AddressDTO } from '../presentation/dtos/AddressDTO';

export function rawAddressToProps(addressDTO: AddressDTO): AddressProps {
  const { street, city, state, zipCode } = addressDTO;

  const addressProps = {
    street: street,
    city: city,
    state: state,
    zipCode: zipCode,
  };

  return addressProps;
}
