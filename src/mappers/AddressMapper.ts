import { AddressResponseDTO } from '../application/useCaseDtos/AddressResponseDTO';
import { AddressProps } from '../domain/entities/props/AddressProps';
import { AddressModel } from '../infrastructure/models/mongodb/AddressModel';
import { AddressDTO } from '../presentation/dtos/AddressDTO';

export class AddressMapper {
  static rawToProps(addressDTO: AddressDTO): AddressProps {
    const { street, city, state, zipCode } = addressDTO;

    const addressProps = {
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    return addressProps;
  }

  static modelToResponseDTO(addressModel: AddressModel): AddressResponseDTO {
    const { street, city, state, zipCode } = addressModel;

    const addressResponse = {
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    return addressResponse;
  }
}
