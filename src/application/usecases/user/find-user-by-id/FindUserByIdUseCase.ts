import { UserRepository } from "../../../_ports/user-repository";
import { FindUserById } from "./interface";
import { FindUserByIdResponse } from "./response";

export class FindUserByIdUseCase implements FindUserById {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  execute(id: string): Promise<FindUserByIdResponse> {
    return this.userRepository.findUserById(id);
  }
}