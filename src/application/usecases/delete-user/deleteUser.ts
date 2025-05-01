import { Either } from "../../../shared/either";
import { Email } from "../../../domain/entities/validation";
import { UserRepository } from "../ports/user-repository";
import { DeleteUserUseCase } from "./interface";
import { DeleteUserResponse } from "./response";
import { NoResultError } from "../_erros";
import { InvalidEmailError } from "../../../domain/entities/_errors";

export class DeleteUser implements DeleteUserUseCase {

  private readonly userRepository: UserRepository;
  
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async delete(email: string): Promise<DeleteUserResponse> {
    
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(email);

    if(emailOrError.isLeft()){
      return Either.left(emailOrError.getLeft());
    }

    const validatedEmail = emailOrError.getRight().get();

    const user = await this.userRepository.findUserByEmail(validatedEmail);

    if(!user){
      return Either.left(new NoResultError(`User with email ${validatedEmail} does not exist.`))
    }

    await this.userRepository.remove(validatedEmail);

    return Either.right(user);
  }
}