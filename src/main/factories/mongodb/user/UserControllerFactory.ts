import { RegisterUserUseCase } from "../../../../application/usecases/user/register-user/RegisterUserUseCase";
import { UpdateUserUseCase } from "../../../../application/usecases/user/update-user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../../application/usecases/user/delete-user/DeleteUserUseCase";
import { FindAllUsersUseCase } from "../../../../application/usecases/user/find-all-users/FindAllUsersUseCase";
import { FindUserByIdUseCase } from "../../../../application/usecases/user/find-user-by-id/FindUserByIdUseCase";
import { FindUserByEmailUseCase } from "../../../../application/usecases/user/find-user-by-email/FindUserByEmailUseCase";
import { MongodbUserRepository } from "../../../../infrastructure/repositories/mongodb/mongodb-user-repository";
import { RegisterUserController } from "../../../../presentation/controllers/user/RegisterUserController";
import { UpdateUserController } from "../../../../presentation/controllers/user/UpdateUserController";
import { DeleteUserController } from "../../../../presentation/controllers/user/DeleteUserController";
import { FindAllUsersController } from "../../../../presentation/controllers/user/FindAllUsersController";
import { FindUserByIdController } from "../../../../presentation/controllers/user/FindUserByIdController";
import { FindUserByEmailController } from "../../../../presentation/controllers/user/FindUserByEmailController";

export class UserControllerFactory {
  private static userRepository = new MongodbUserRepository();

  private constructor(){
    throw new Error("This class is static and cannot be instantied.")
  }

  static makeRegisterUserController(): RegisterUserController {
    const useCase = new RegisterUserUseCase(this.userRepository);
    return new RegisterUserController(useCase);
  }

  static makeUpdateUserController(): UpdateUserController {
    const useCase = new UpdateUserUseCase(this.userRepository);
    return new UpdateUserController(useCase);
  }

  static makeDeleteUserController(): DeleteUserController {
    const useCase = new DeleteUserUseCase(this.userRepository);
    return new DeleteUserController(useCase);
  }

  static makeFindAllUsersController(): FindAllUsersController {
    const useCase = new FindAllUsersUseCase(this.userRepository);
    return new FindAllUsersController(useCase);
  }

  static makeFindUserByIdController(): FindUserByIdController {
    const useCase = new FindUserByIdUseCase(this.userRepository);
    return new FindUserByIdController(useCase);
  }

  static makeFindUserByEmailController(): FindUserByEmailController {
    const useCase = new FindUserByEmailUseCase(this.userRepository);
    return new FindUserByEmailController(useCase);
  }
}