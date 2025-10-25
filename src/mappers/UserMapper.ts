import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { CustomerProps } from '../domain/entities/props/CustomerProps';
import { CustomerResponseDTO } from '../application/useCaseDtos/CustomerResponseDTO';
import { dateToString } from '../utils/dateToString';
import { WithId } from '../utils/types/WithId';

export class UserMapper {
  static propsToPersistence(user: CustomerProps): UserModel {
    const {
      firstName,
      lastName,
      email,
      cpf,
      phone,
      role,
      birthday,
      passwordHash,
    } = user;

    return {
      firstName: firstName.getValue(),
      lastName: lastName.getValue(),
      email: email.getValue(),
      cpf: cpf.getValue(),
      phone: phone.getValue(),
      role,
      birthday: birthday.getValue(),
      passwordHash: passwordHash.getValue(),
      createdAt: new Date(),
    };
  }

  static toResponse(user: WithId<CustomerProps>): CustomerResponseDTO {
    const { id, firstName, lastName, email, phone, role, birthday, address } =
      user;

    const birthdayStr = dateToString(birthday.getValue());

    return {
      id,
      firstName: firstName.getValue(),
      lastName: lastName.getValue(),
      email: email.getValue(),
      phone: phone.getValue(),
      role,
      birthday: birthdayStr,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode.getValue()
      },
    };
  }
}
