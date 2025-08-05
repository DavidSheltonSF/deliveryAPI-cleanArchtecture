import { CreateCustomerUseCase } from '../../../../application/usecases/customer/CreateCustomer/CreateCustomerUseCase';
import { MongodbAddressRepository } from '../../../../infrastructure/repositories/mongodb/MongodbAddressRepository';
import { MongodbAuthenticationRepository } from '../../../../infrastructure/repositories/mongodb/MongodbAuthenticationRepository';
import { MongodbCustomerRepository } from '../../../../infrastructure/repositories/mongodb/MongodbCustomerRepository';
import { BcryptHasher } from '../../../../infrastructure/services/BcryptHasher';
import { CreateCustomerController } from '../../../../presentation/controllers/customer/CreateCustomerController';

export class CustomerControllerFactory {
  private static customerRepository = new MongodbCustomerRepository();
  private static addressRepostiory = new MongodbAddressRepository();
  private static authRepository = new MongodbAuthenticationRepository();

  private constructor() {
    throw new Error('This class is static and cannot be instantied.');
  }

  static makeCreateCustomerController(): CreateCustomerController {
    const hasher = new BcryptHasher(12);
    const useCase = new CreateCustomerUseCase(
      this.customerRepository,
      this.addressRepostiory,
      this.authRepository,
      hasher
    );
    return new CreateCustomerController(useCase);
  }
}
