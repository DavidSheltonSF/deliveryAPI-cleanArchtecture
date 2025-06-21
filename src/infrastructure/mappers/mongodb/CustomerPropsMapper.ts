import { CustomerProps } from '../../../domain/entities/customer-props';
import { customerValidationError } from '../../../domain/entities/errors/customerValidationError';
import {
  Address,
  Password,
  Cpf,
  Name,
  Phone,
  Role,
  Email,
} from '../../../domain/entities/value-objects';
import { CustomerModel } from '../../models/mongodb/customer-model';
import { Either } from '../../../shared/either';
import { mongoHelper } from '../../repositories/mongodb/helpers/mongo-helper';

export class CustomerPropsMapper {
  static fromPropsToModel(
    customerId: string,
    customerData: CustomerProps
  ): Omit<CustomerModel, 'createdAt'> {
    return {
      _id: mongoHelper.toObjectId(customerId),
      username: customerData.username.get(),
      email: customerData.email.get(),
      cpf: customerData.cpf.get(),
      phone: customerData.phone.get(),
      role: customerData.role.get(),
      address: customerData.address.get(),
      authentication: {
        passwordHash: customerData.authentication.passwordHash.get(),
        sessionToken: customerData.authentication.sessionToken,
      },
    };
  }

  static fromModelToProps(
    customerData: CustomerModel
  ): Either<customerValidationError, CustomerProps> {
    const usernameOrError = Name.create(customerData.username);
    const emailOrError = Email.create(customerData.email);
    const cpfOrError = Cpf.create(customerData.cpf);
    const phoneOrError = Phone.create(customerData.phone);
    const roleOrError = Role.create(customerData.role);
    const addressOrError = Address.create(customerData.address);
    const passwordOrError = Password.create(
      customerData.authentication.passwordHash
    );

    if (usernameOrError.isLeft()) {
      return Either.left(usernameOrError.getLeft());
    }
    if (emailOrError.isLeft()) {
      return Either.left(emailOrError.getLeft());
    }
    if (cpfOrError.isLeft()) {
      return Either.left(cpfOrError.getLeft());
    }
    if (phoneOrError.isLeft()) {
      return Either.left(phoneOrError.getLeft());
    }
    if (roleOrError.isLeft()) {
      return Either.left(roleOrError.getLeft());
    }
    if (addressOrError.isLeft()) {
      return Either.left(addressOrError.getLeft());
    }
    if (passwordOrError.isLeft()) {
      return Either.left(passwordOrError.getLeft());
    }

    const validAuthentication = {
      passwordHash: passwordOrError.getRight(),
      sessionToken: customerData.authentication?.sessionToken,
    };

    return Either.right({
      username: usernameOrError.getRight(),
      email: emailOrError.getRight(),
      cpf: cpfOrError.getRight(),
      phone: phoneOrError.getRight(),
      role: roleOrError.getRight(),
      address: addressOrError.getRight(),
      authentication: validAuthentication,
    });
  }
}
