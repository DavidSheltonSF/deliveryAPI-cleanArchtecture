import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { UserDTO } from '../../presentation/dtos/UserDTO';

export class RawDataExtractor {
  static extractUser(data: CreateUserDTO): UserDTO {
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

  static extractAddress(data: CreateUserDTO): AddressDTO {
    const { street, city, state, zipCode } = data.address;
    return {
      street,
      city,
      state,
      zipCode,
    };
  }

  static extractAuthentication(data: CreateUserDTO): AuthenticationDTO {
    const { password, sessionToken } = data.authentication;
    return {
      password,
      sessionToken,
    };
  }
}
