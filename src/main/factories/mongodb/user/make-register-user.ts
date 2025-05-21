import { RegisterUserUseCase } from "../../../../application/usecases/user/register-user/RegisterUserUseCase";
import { MongodbUserRepository } from "../../../../infrastructure/repositories/mongodb/mongodb-user-repository";
import { RegisterUserController } from "../../../../presentation/controllers/user/RegisterUserController";

export const makeRegisterUserController = (): RegisterUserController => {
  const userRepository = new MongodbUserRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  const registerUserControler = new RegisterUserController(registerUserUseCase);

  return registerUserControler;
}