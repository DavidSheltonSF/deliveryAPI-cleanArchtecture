import { CustomerRepository } from '../../../_ports/customer-repository';
import { CreateUser } from './interface';
import { CreateUserResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { UserFieldsValidator } from '../../../helpers/FieldsValidator';

export class CreateUserUseCase implements CreateUser {
  private readonly customerRepository: CustomerRepository;
  constructor(customerRepo: CustomerRepository) {
    this.customerRepository = customerRepo;
  }

  async execute(userData: CreateUserDTO): Promise<CreateUserResponse> {
    const addressDTO = userData.address;
    const authenticationDTO = userData.authentication;

    // Session token does not have a VO to validate
    delete fields.sessionToken;

    const validationResult = UserFieldsValidator.validateFields(fields);

    return Either.right(response);
  }
}
