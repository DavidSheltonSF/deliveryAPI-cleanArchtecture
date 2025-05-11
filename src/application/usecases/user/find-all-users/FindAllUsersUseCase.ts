import { UserRepository } from "../../../_ports/user-repository";
import { FindAllUsers } from "./interface"
import { FindAllUsersResponse } from "./response";

export class FindAllUsersUseCase implements FindAllUsers {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async execute(): Promise<FindAllUsersResponse> {
    const result = await this.userRepository.findAllUsers();
    return result;
  }
}