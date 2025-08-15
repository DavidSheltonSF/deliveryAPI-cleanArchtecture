import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { UserProps } from '../domain/entities/props/UserProps';

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
}
