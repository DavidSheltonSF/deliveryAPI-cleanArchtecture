import { Either } from "../../../shared/either";
import { UserRepository } from "../_ports/user-repository";
import { FindUserByEmailResponse } from "./response";

export class FindUserByEmail {
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async execute(email: string): Promise<FindUserByEmailResponse> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }
}
