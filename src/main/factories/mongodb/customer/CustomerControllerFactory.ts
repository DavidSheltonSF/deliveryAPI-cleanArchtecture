import { CreateCustomerUseCase } from '../../../../application/usecases/customer/CreateCustomer/CreateCustomerUseCase';
import { UpdateCustomerUseCase } from '../../../../application/usecases/customer/UpdateCustomer/UpdateCustomerUseCase';
import { MongodbAddressRepository } from '../../../../infrastructure/repositories/mongodb/MongodbAddressRepository';
import { MongodbCustomerRepository } from '../../../../infrastructure/repositories/mongodb/MongodbCustomerRepository';
import { BcryptHasher } from '../../../../infrastructure/services/BcryptHasher';
import { CreateCustomerController } from '../../../../presentation/controllers/customer/CreateCustomerController';
import { UpdateCustomerController } from '../../../../presentation/controllers/customer/UpdateCustomerController';

export class CustomerControllerFactory {
  private static customerRepository = new MongodbCustomerRepository();
  private static addressRepostiory = new MongodbAddressRepository();

  private constructor() {
    throw new Error('This class is static and cannot be instantied.');
  }

  static makeCreateCustomerController(): CreateCustomerController {
    const hasher = new BcryptHasher(12);
    const useCase = new CreateCustomerUseCase(
      this.customerRepository,
      this.addressRepostiory,
      hasher
    );
    return new CreateCustomerController(useCase);
  }

  static makeUpdateCustomerController(): UpdateCustomerController {
    const useCase = new UpdateCustomerUseCase(this.customerRepository);
    return new UpdateCustomerController(useCase);
  }
}
