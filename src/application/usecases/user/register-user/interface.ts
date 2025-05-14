import { UserProps} from "../../../../domain/entities/user-props";
import { RegisterUserResponse } from "./response";


export interface RegisterUser {
  execute: (user: UserProps) => Promise<RegisterUserResponse>;
}