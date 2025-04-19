import { User as UserData } from "../../../domain/entities/userProps";
import { RegisterUserResponse } from "./response";


export interface RegisterUserUseCase {
  register: (user: UserData) => Promise<RegisterUserResponse>;
}