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
} from '../../../domain/entities/value-objects';
import { CustomerModel } from '../../models/mongodb/CustomerModel';
import { Either } from '../../../shared/either';
import { mongoHelper } from '../../repositories/mongodb/helpers/mongo-helper';
import { BcryptHasher } from '../../cryptography/BcryptHasher';
import { CustomerUseCaseDto } from '../../../application/useCaseDtos/CustomerUseCaseDto';
import { Customer } from '../../../domain/entities/customer/Customer';

export class CustomerPropsMapper {
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
      authentication: {
        passwordHash: customerData.hashedPassword.get(),
        sessionToken: customerData.sessionToken,
      },
    };
  }

  static async fromModelToUseCaseDto(
    customerData: CustomerModel
  ): Promise<CustomerUseCaseDto> {
    return {
      id: customerData._id.toString(),
      username: customerData.username,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      role: customerData.role,
      address: customerData.address,
    };
  }
}
