
import { CustomerRepository } from '../../../_ports/customer-repository';
import { RegisterCustomer } from './interface';
import { RegisterCustomerResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CustomerDTO } from '../../../../presentation/dtos/custumer-dto';
import { CustomerProps } from '../../../../domain/entities/customer-props';
import { CustomerMapper } from '../../../mappers/CustomerMapper';

export class RegisterCustomerUseCase implements RegisterCustomer {
  private readonly customerRepository: CustomerRepository;
  constructor(customerRepo: CustomerRepository) {
    this.customerRepository = customerRepo;
  }

  async execute(customerData: CustomerDTO): Promise<RegisterCustomerResponse> {
    const customerOrError = CustomerMapper.fromDtoToProps(customerData);

    if (customerOrError.isLeft()) {
      return Either.left(customerOrError.getLeft());
    }

    // const existingCustomer = await this.customerRepository.findCustomerByEmail(
    //   customerData.email
    // );

    // if (existingCustomer) {
    //   return Either.left(
    //     new DuplicatedDataError(
    //       `Customer with email ${customerData.email} already exists.`
    //     )
    //   );
    // }

    const response = await this.customerRepository.add(
      customerOrError.getRight()
    );

    const registeredCustomerOrError = CustomerMapper.fromModelToProps(response);

    if (registeredCustomerOrError.getLeft()) {
      return Either.left(registeredCustomerOrError.getLeft());
    }

    return Either.right(registeredCustomerOrError.getRight());
  }
}
