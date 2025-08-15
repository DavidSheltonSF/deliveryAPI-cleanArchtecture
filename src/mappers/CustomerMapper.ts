import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { UserProps } from '../domain/entities/props/UserProps';
import { UserResponseDTO } from '../application/useCaseDtos/UserResponseDTO';
import { dateToString } from '../utils/dateToString';
import { WithId } from '../utils/types/WithId';

export class CustomerMapper {
  static propsToPersistence(customer: UserProps): UserModel {
    const { firstName, lastName, email, cpf, phone, role, birthday } = customer;

    return {
      firstName: firstName.getValue(),
      lastName: lastName.getValue(),
      email: email.getValue(),
      cpf: cpf.getValue(),
      phone: phone.getValue(),
      role,
      birthday: birthday.getValue(),
      createdAt: new Date(),
    };
  }

  static toResponse(customer: WithId<UserProps>): UserResponseDTO {
    const { id, firstName, lastName, email, phone, role, birthday } = customer;

    const birthdayStr = dateToString(birthday.getValue());

    return {
      id,
      firstName: firstName.getValue(),
      lastName: lastName.getValue(),
      email: email.getValue(),
      phone: phone.getValue(),
      role,
      birthday: birthdayStr,
    };
  }
}
