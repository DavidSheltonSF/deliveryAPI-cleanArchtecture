import { CustomerProps } from '../../../domain/entities/customer/CustomerProps';
import { customerValidationError } from '../../../domain/entities/errors/customerValidationError';
import {
  Address,
  Password,
  Cpf,
  Name,
  Phone,
  Role,
  Email,
  HashedPassword,
} from '../../../domain/value-objects';
import { Document, WithId } from 'mongodb';
import { CustomerModel } from '../../models/mongodb/CustomerModel';
import { Either } from '../../../shared/either';
import { mongoHelper } from '../../repositories/mongodb/helpers/mongo-helper';
import { BcryptHasher } from '../../cryptography/BcryptHasher';
import { CustomerUseCaseDto } from '../../../application/useCaseDtos/CustomerUseCaseDto';
import { Customer } from '../../../domain/entities/customer/Customer';

export class CustomerModelMapper {
  static fromEntityToModel(
    customerData: Customer
  ): Omit<CustomerModel, 'createdAt' | '_id'> {
    return {
      username: customerData.username.get(),
      name: customerData.name.get(),
      email: customerData.email.get(),
      cpf: customerData.cpf.get(),
      phone: customerData.phone.get(),
      role: customerData.role.get(),
      address: customerData.address.get(),
      birthday: customerData.birthday.get(),
      authentication: {
        passwordHash: customerData.hashedPassword.get(),
        sessionToken: customerData.sessionToken,
      },
    };
  }

  static fromMongodbDocumentToModel(
    data: WithId<Document> | Document
  ): CustomerModel | null {
    if (data === null) {
      return null;
    }
    return {
      _id: data._id,
      username: data.username,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      role: data.role,
      birthday: data.birthday,
      address: data.address,
      authentication: data.authentication,
      createdAt: data.createdAt,
    };
  }
}
