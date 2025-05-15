import { UserProps} from "../../../../domain/entities/user-props";
import { RegisterUserResponse } from "./response";


export interface RegisterUser {
  execute: (user: Omit<UserProps, "_id">) => Promise<RegisterUserResponse>;
}