import { MongodbUserRepository } from "../../../../infrastructure/repositories/mongodb/mongodb-user-repository";
import { DeleteUserUseCase } from "../../../../application/usecases/user/delete-user/DeleteUserUseCase";
import { DeleteUserController } from "../../../../presentation/controllers/user/DeleteUserController";

export const makeDeleteUserController = (): DeleteUserController => {
  const userRepository = new MongodbUserRepository();
  const registerUserUseCase = new DeleteUserUseCase(userRepository);
  const registerUserControler = new DeleteUserController(registerUserUseCase);

  return registerUserControler;
}