import { CreateUserDTO } from '../../presentation/dtos/CreateUserDTO';
import { Either } from '../../shared/either';
import { FieldsValidator } from './FieldsValidator';
import { validateAddress } from './validateAddress';
import { validateAuthentication } from './validateAuthentication';

export function validateCustomer(customer: CreateUserDTO) {
  const {
    username,
    name,
    email,
    cpf,
    phone,
    birthday,
    role,
    address,
    authentication,
  } = customer;

  const validation = FieldsValidator.validateFields({
    username,
    name,
    email,
    cpf,
    phone,
    birthday,
    role,
  });

  if (validation.isLeft()) {
    return Either.left(validation.getLeft());
  }

  const addressValidation = validateAddress(address);
  if (addressValidation.isLeft()) {
    return Either.left(addressValidation.getLeft());
  }

  const authenticationValidation = validateAuthentication(authentication);
  if (authenticationValidation.isLeft()) {
    return Either.left(authenticationValidation.getLeft());
  }
}
