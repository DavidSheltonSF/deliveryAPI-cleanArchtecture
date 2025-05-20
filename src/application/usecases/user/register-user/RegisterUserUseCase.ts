import { User } from "../../../../domain/entities/validation";
import { UserProps } from "../../../../domain/entities/user-props";
import { UserRepository } from "../../../_ports/user-repository";
import { RegisterUser } from "./interface";
import { RegisterUserResponse } from "./response";
import { Either } from "../../../../shared/either";
import { DuplicatedDataError } from "../../../_errors/duplicated-data";

export class RegisterUserUseCase implements RegisterUserUseCase {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async execute(userData: Omit<UserProps, "_id">): Promise<RegisterUserResponse> {

    const userOrError = User.createFull(userData);

    if(userOrError.isLeft()){
      return Either.left(userOrError.getLeft());
    }

    const existingUser = await this.userRepository.findUserByEmail(userData.email);

    if(existingUser){
      return Either.left(new DuplicatedDataError(`User with email ${userData.email} already existis.`))
    }

    await this.userRepository.add(userData);

    return Either.right(userData);
  }
}