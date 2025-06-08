import { User } from "../../../../domain/entities/validation";
import { UserProps } from "../../../../domain/entities/user-props";
import { UserRepository } from "../../../_ports/user-repository";
import { UpdateUser } from "./interface";
import { UpdateUserResponse } from "./response";
import { Either } from "../../../../shared/either";
import { DuplicatedDataError, NoResultError } from "../../../_errors";

export class UpdateUserUseCase implements UpdateUser {

  private readonly userRepository: UserRepository;
  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async execute(id: string, userData: Partial<Omit<UserProps, "id">>): Promise<UpdateUserResponse> {

    const userOrError = User.createPartial(userData);

    if(userOrError.isLeft()){
      return Either.left(userOrError.getLeft());
    }

    const existingUser = await this.userRepository.findUserById(id);

    if(!existingUser){
      return Either.left(new NoResultError(`User with id ${id} does not exists.`))
    }

    // Check if the email was updated, then check if the new email is already in use
    if (userData.email && existingUser.email != userData.email){
      const userWithEmail = await this.userRepository.findUserByEmail(userData.email);
      if (userWithEmail && userWithEmail.id.toString() !== id){
        return Either.left(new DuplicatedDataError(`The email ${userData.email} already associated with another user.`));
      }
    }

    await this.userRepository.update(id, userData);

    return Either.right({message: "User updated successfully."});
  }
}