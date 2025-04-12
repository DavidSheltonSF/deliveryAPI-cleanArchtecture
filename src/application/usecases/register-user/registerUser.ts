import { User as UserValidator } from "../../../domain/entities/validators";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../ports/user-repository";
import { RegisterUserUseCase } from "./interface";
import { RegisterUserResponse } from "./response";
import { Either } from "../../../shared/either";
import { DuplicatedDataError } from "../_erros/duplicated-data";

export class RegisterUser implements RegisterUserUseCase {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async register(userData: User): Promise<RegisterUserResponse> {
    
    const userOrError = UserValidator.create(userData);

    if(userOrError.isLeft()){
      return Either.left(userOrError.getLeft());
    }

    const existingUser = await this.userRepository.exists(userData.email);

    if(existingUser){
      return Either.left(new DuplicatedDataError(`User with email ${userData.email} already existis.`))
    }

    await this.userRepository.add(userData);

    return Either.right(userData);
  }
}