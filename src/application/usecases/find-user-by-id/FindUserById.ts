import { Either } from "../../../shared/either";
import { NoResultError } from "../_errors";
import { UserRepository } from "../_ports/user-repository";
import { FindUserByIdUseCase } from "./interface";
import { FindUserByIdResponse } from "./response";

export class FindUserById implements FindUserByIdUseCase {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async execute(id: string): Promise<FindUserByIdResponse> {
    const result = await this.userRepository.findUserById(id);

    if (result === null) {
      return Either.left(new NoResultError(`User with id ${id} not found`));
    }

    return Either.right(result);
  }

}