import { UserRepository } from "../../../_ports/user-repository";
import { FindUserByEmail } from "./interface";
import { FindUserByEmailResponse } from "./response";

export class FindUserByEmailUseCase implements FindUserByEmail{
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async execute(email: string): Promise<FindUserByEmailResponse> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }
}
