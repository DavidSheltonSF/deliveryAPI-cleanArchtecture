import { CustomerProps } from '../../domain/entities/customer-props';
import { customerValidationError } from '../../domain/entities/errors/customerValidationError';
import {
  Address,
  Password,
  HashedPassword,
  Cpf,
  Name,
  Phone,
  Role,
  Email,
} from '../../domain/entities/value-objects';
import { CustomerDTO } from '../dtos/custumer-dto';
import { Either } from '../../shared/either';
import { BcryptHasher } from '../../infrastructure/cryptography/BcryptHasher';

export class CustomerDtoMapper {
  static  async fromDtoToProps(
    customerData: CustomerDTO
  ): Promise<Either<customerValidationError, CustomerProps>> {
    const validations = {
      username: Name.create(customerData.username),
      email: Email.create(customerData.email),
      cpf: Cpf.create(customerData.cpf),
      phone: Phone.create(customerData.phone),
      role: Role.create(customerData.role),
      address: Address.create(customerData.address),
      password: Password.create(customerData.authentication.password),
    };

    for (let validation of Object.values(validations)) {
      if (validation.isLeft()) {
        return Either.left(validation.getLeft());
      }
    }

    const hasher = new BcryptHasher(12)

    const hashedPasswordOrError = await HashedPassword.create(validations.password.getRight(), hasher);

    if(hashedPasswordOrError.isLeft()){
      return Either.left(hashedPasswordOrError.getLeft());
    }

    console.log('wrong way');
    const username = validations.username.getRight();
    const email = validations.email.getRight();
    const cpf = validations.cpf.getRight();
    const phone = validations.phone.getRight();
    const role = validations.role.getRight();
    const address = validations.address.getRight();
    const hashedPassword = hashedPasswordOrError.getRight()


    return Either.right({
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication: {
        hashedPassword: hashedPassword,
        sessionToken: customerData.authentication?.sessionToken,
      },
    });
  }

  static fromPropsToDto(customerData: CustomerProps): CustomerDTO {
    return {
      username: customerData.username.get(),
      email: customerData.email.get(),
      cpf: customerData.cpf.get(),
      phone: customerData.phone.get(),
      role: customerData.role.get(),
      address: customerData.address.get(),
      authentication: {
        password: customerData.authentication.hashedPassword.get(),
        sessionToken: customerData.authentication.sessionToken,
      },
    };
  }
}
