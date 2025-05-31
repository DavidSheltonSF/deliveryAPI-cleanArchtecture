import { InvalidIdError } from "../../../../domain/entities/errors";
import { ID } from "../../../../domain/entities/validation";
import { Either } from "../../../../shared/either";
import { UserRepository } from "../../../_ports/user-repository";
import { FindUserById } from "./interface";
import { FindUserByIdResponse } from "./response";

export class FindUserByIdUseCase implements FindUserById {

  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async execute(id: string): Promise<FindUserByIdResponse> {

    const idOrError = ID.create(id);

    if(idOrError.isLeft()){
      return Either.left(new InvalidIdError(id));
    }

    return Either.right(await this.userRepository.findUserById(id));
  }
}