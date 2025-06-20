import { CustomerProps } from '../../domain/entities/customer-props';
import { customerValidationError } from '../../domain/entities/errors/customerValidationError';
import {
  Address,
  Password,
  Cpf,
  Name,
  Phone,
  Role,
  Email,
} from '../../domain/entities/validation';
import { CustomerDTO } from '../dtos/custumer-dto';
import { Either } from '../../shared/either';

export class CustomerDtoMapper {
  static fromDtoToProps(
    customerData: CustomerDTO
  ): Either<customerValidationError, CustomerProps> {
    const validations = {
      username: Name.create(customerData.username),
      email: Email.create(customerData.email),
      cpf: Cpf.create(customerData.cpf),
      phone: Phone.create(customerData.phone),
      role: Role.create(customerData.role),
      address: Address.create(customerData.address),
      password: Password.create(customerData.authentication.password),
    };

    Object.values(validations).forEach((validation) => {
      if (validation.isLeft()) {
        return Either.left(validation.getLeft());
      }
    });

    const username = validations.username.getRight();
    const email = validations.email.getRight();
    const cpf = validations.cpf.getRight();
    const phone = validations.phone.getRight();
    const role = validations.role.getRight();
    const address = validations.address.getRight();
    const password = validations.password.getRight();

    const validAuthentication = {
      passwordHash: password,
      sessionToken: customerData.authentication?.sessionToken,
    };

    return Either.right({
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication: validAuthentication,
    });
  }
}
