import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { CreateCustomerDTO } from '../../presentation/dtos/CreateCustomerDTO';
import { UserDTO } from '../../presentation/dtos/UserDTO';

export class RawDataExtractor {
  static extractUser(data: CreateCustomerDTO): UserDTO {
    const { firstName, lastName, email, cpf, phone, birthday, role, password } = data.user;
    return {
      firstName,
      lastName,
      email,
      cpf,
      phone,
      birthday,
      role,
      password
    };
  }

  static extractAddress(data: CreateCustomerDTO): AddressDTO {
    const { street, city, state, zipCode } = data.address;
    return {
      street,
      city,
      state,
      zipCode,
    };
  }
}
