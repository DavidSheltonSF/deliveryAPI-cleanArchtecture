import { WithId, Document } from 'mongodb';
import { CustomerModel } from '../infrastructure/models/mongodb/CustomerModel';
import { stringToObjectId } from '../infrastructure/repositories/mongodb/helpers/stringToObjectId';
import { CustomerUser } from '../domain/entities/CustomerUser';
import { CreateUserDTO } from '../presentation/dtos/CreateUserDTO';
import { UserProps } from '../domain/entities/props/UserProps';
import { UserResponseDTO } from '../application/useCaseDtos/UserResponseDTO';

export class CustomerMapper {
  static rawToProps(userDTO: CreateUserDTO): UserProps {
    const { username, name, email, cpf, phone, birthday } = userDTO;

    return {
      username,
      name,
      email,
      cpf,
      phone,
      birthday: new Date(birthday),
    };
  }

  static modelToResponseDTO(customerModel: CustomerModel): UserResponseDTO {
    const { _id, username, name, email, phone, role, createdAt } =
      customerModel;

    return {
      id: _id.toString(),
      username,
      name,
      email,
      phone,
      role,
      createdAt: createdAt.toISOString().split('T')[0],
    };
  }

  static persistenceToCustomerModel(document: WithId<Document>): CustomerModel {
    if (document === null) {
      throw Error('No document provided from persistence.');
    }

    return {
      _id: document._id,
      username: document.username,
      name: document.name,
      email: document.email,
      cpf: document.cpf,
      phone: document.phone,
      role: document.role,
      birthday: document.birthday,
      createdAt: document.createdAt,
    };
  }

  static entityToCustomerModel(customer: CustomerUser): CustomerModel {
    if (customer === null) {
      throw Error('No entity provided.');
    }

    return {
      _id: stringToObjectId(customer.id),
      username: customer.username,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      phone: customer.phone,
      role: customer.role,
      birthday: customer.birthday,
      createdAt: new Date(),
    };
  }
}
