import { UserProps } from "../../../domain/entities/user-props";
import { UserRepository } from "../_ports/user-repository";
import { FindUsersUseCase } from "./interface"

export class FindUser implements FindUsersUseCase {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async execute(): Promise<UserProps[]> {
    const result = await this.userRepository.findAllUsers();
    return result;
  }
}