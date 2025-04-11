import { User as UserData } from "../../../domain/entities/user";
import { RegisterUserResponse } from "./response";


export interface RegisterUserUseCase {
  register: (user: UserData) => Promise<RegisterUserResponse>;
}