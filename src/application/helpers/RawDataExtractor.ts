import { RawAddressProps } from '../../domain/entities/rawProps/RawAddressProps';
import { RawAuthenticationProps } from '../../domain/entities/rawProps/RawAuthenticationProps';
import { RawUserProps } from '../../domain/entities/rawProps/RawUserProps';
import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';

export class RawDataExtractor {
  static extractUser(data: CreateUserDTO): RawUserProps {
    const { username, name, email, cpf, phone, birthday } = data.user;
    return {
      username,
      name,
      email,
      cpf,
      phone,
      birthday: new Date(birthday),
    };
  }

  static extractAddess(data: CreateUserDTO): RawAddressProps {
    const { street, city, state, zipCode } = data.address;
    return {
      street,
      city,
      state,
      zipCode,
    };
  }

  static extractAuthentication(data: CreateUserDTO): RawAuthenticationProps {
    const { password, sessionToken } = data.authentication;
    return {
      password,
      sessionToken
    };
  }
}
