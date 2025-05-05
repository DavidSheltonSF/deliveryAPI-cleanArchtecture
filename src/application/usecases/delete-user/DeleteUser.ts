import { Either } from "../../../shared/either";
import { UserRepository } from "../ports/user-repository";
import { DeleteUserUseCase } from "./interface";
import { DeleteUserResponse } from "./response";
import { NoResultError } from "../_errors";

export class DeleteUser implements DeleteUserUseCase {

  private readonly userRepository: UserRepository;
  
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async delete(id: string): Promise<DeleteUserResponse> {

    const user = await this.userRepository.findUserById(id);

    if(!user){
      return Either.left(new NoResultError(`User with id ${id} does not exist.`))
    }

    await this.userRepository.remove(id);

    return Either.right(user);
  }
}