import { RegisterCustomerUseCase } from '../../../../application/usecases/user/register-user/RegisterCustomerUseCase';
import { MongodbCustomerRepository } from '../../../../infrastructure/repositories/mongodb/mongodb-customer-repository';
import { RegisterCustomerController } from '../../../../presentation/controllers/customer/RegisterCustomerController';

export class UserControllerFactory {
  private static userRepository = new MongodbCustomerRepository();

  private constructor() {
    throw new Error('This class is static and cannot be instantied.');
  }

  static makeRegisterCustomerController(): RegisterCustomerController {
    const useCase = new RegisterCustomerUseCase(this.userRepository);
    return new RegisterCustomerController(useCase);
  }
}
