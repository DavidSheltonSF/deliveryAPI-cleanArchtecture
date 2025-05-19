import { 
  Name, Email, Cpf, Phone, Role, Address, Authentication, BankInfo 
} from "../../../../domain/entities/validation";
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

  async execute(id: string, userData: Partial<Omit<UserProps, "_id">>): Promise<UpdateUserResponse> {

    const validators = {
      username: (username: string) => Name.create(username),
      email: (email: string) => Email.create(email),
      cpf: (cpf: string) => Cpf.create(cpf),
      phone: (phone: string) => Phone.create(phone),
      role: (role: string) => Role.create(role),
      address: (address: any) => Address.create(address),
      authentication: (authentication: any) => Authentication.create(authentication),
      bankInfo: (bankInfo: any) => BankInfo.create(bankInfo),
    }

    // Validate each field in userData
    for (const [key, value] of Object.entries(userData)) {

      const fieldOrError = validators[key](value);

      if(fieldOrError.isLeft()){
        return Either.left(fieldOrError.getLeft());
      }
    } 

    const existingUser = await this.userRepository.findUserById(id);

    if(!existingUser){
      return Either.left(new NoResultError(`User with email ${userData.email} does not existis.`))
    }

    // Check if the email was updated, then check if the new email is already in use
    if (existingUser.email != userData.email){
      if (await this.userRepository.findUserByEmail(userData.email)){
        return Either.left(new DuplicatedDataError(`The email ${userData.email} already associated with another user.`));
      }
    }

    await this.userRepository.update(id, userData);

    return Either.right({message: "User updated successfully."});
  }
}