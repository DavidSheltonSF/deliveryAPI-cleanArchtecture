import { InvalidEmailError } from "../../../../domain/entities/errors";
import { Email } from "../../../../domain/entities/validation";
import { Either } from "../../../../shared/either";
import { UserRepository } from "../../../_ports/user-repository";
import { FindUserByEmail } from "./interface";
import { FindUserByEmailResponse } from "./response";

export class FindUserByEmailUseCase implements FindUserByEmail{
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async execute(email: string): Promise<FindUserByEmailResponse> {

    const emailOrError = Email.create(email);

    if(emailOrError.isLeft()){
      return Either.left(new InvalidEmailError(email));
    }

    const user = await this.userRepository.findUserByEmail(email);


    return Either.right(user);
  }
}
