import { User as UserData } from "domain/entities/user";
import { RegisterUserResponse } from "./response";


export interface RegisterUserInterface {
  register: (user: UserData) => Promise<RegisterUserResponse>;
}