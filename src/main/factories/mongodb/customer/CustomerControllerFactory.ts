import { RegisterCustomerUseCase } from '../../../../application/usecases/customer/RegisterCustomer/RegisterCustomerUseCase';
import { MongodbCustomerRepository } from '../../../../infrastructure/repositories/mongodb/mongodb-customer-repository';
import { RegisterCustomerController } from '../../../../presentation/controllers/customer/RegisterCustomerController';

export class CustomerControllerFactory {
  private static customerRepository = new MongodbCustomerRepository();

  private constructor() {
    throw new Error('This class is static and cannot be instantied.');
  }

  static makeRegisterCustomerController(): RegisterCustomerController {
    const useCase = new RegisterCustomerUseCase(this.customerRepository);
    return new RegisterCustomerController(useCase);
  }
}
