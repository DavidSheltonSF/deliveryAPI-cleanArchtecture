import { CustomerRepository } from '../../../_ports/customer-repository';
import { RegisterCustomer } from './interface';
import { RegisterCustomerResponse } from './response';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CustomerProps } from '../../../../domain/entities/customer/CustomerProps';
import { Customer } from '../../../../domain/entities/customer/Customer';

export class RegisterCustomerUseCase implements RegisterCustomer {
  private readonly customerRepository: CustomerRepository;
  constructor(customerRepo: CustomerRepository) {
    this.customerRepository = customerRepo;
  }

  async execute(
    customerData: CustomerProps
  ): Promise<RegisterCustomerResponse> {
    const customer = new Customer(customerData);

    const existingCustomer = await this.customerRepository.findCustomerByEmail(
      customer.email.get()
    );

    if (existingCustomer) {
      return Either.left(
        new DuplicatedDataError(
          `Customer with email ${customerData.email} already exists.`
        )
      );
    }

    const registredCustomer = await this.customerRepository.add(customer);

    const response = {
      id: registredCustomer._id.toString(),
      username: registredCustomer.username,
      name: registredCustomer.name,
      email: registredCustomer.email,
      phone: registredCustomer.phone,
      role: registredCustomer.role,
      address: registredCustomer.address,
    };

    return Either.right(response);
  }
}
