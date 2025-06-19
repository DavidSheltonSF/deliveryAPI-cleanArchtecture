import { RegisterUserUseCase } from '../../../../application/usecases/user/register-user/RegisterUserUseCase';
import { MongodbUserRepository } from '../../../../infrastructure/repositories/mongodb/mongodb-user-repository';
import { RegisterCustomerController } from '../../../../presentation/controllers/customer/RegisterCustomerController';

export class UserControllerFactory {
  private static userRepository = new MongodbUserRepository();

  private constructor() {
    throw new Error('This class is static and cannot be instantied.');
  }

  static makeRegisterCustomerController(): RegisterCustomerController {
    const useCase = new RegisterUserUseCase(this.userRepository);
    return new RegisterCustomerController(useCase);
  }
}
