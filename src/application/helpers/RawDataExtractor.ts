import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { CreateCustomerDTO } from '../../presentation/dtos/CreateCustomerDTO';
import { UserDTO } from '../../presentation/dtos/UserDTO';

export class RawDataExtractor {
  static extractUser(data: CreateCustomerDTO): UserDTO {
    const { firstName, lastName, email, cpf, phone, birthday, role } = data.user;
    return {
      firstName,
      lastName,
      email,
      cpf,
      phone,
      birthday,
      role,
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

  static extractAuthentication(data: CreateCustomerDTO): AuthenticationDTO {
    const { password, sessionToken } = data.authentication;
    return {
      password,
      sessionToken,
    };
  }
}
