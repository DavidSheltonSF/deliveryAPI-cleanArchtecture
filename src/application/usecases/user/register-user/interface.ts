import { UserProps} from "../../../../domain/entities/user-props";
import { RegisterUserResponse } from "./response";


export interface RegisterUserUseCase {
  execute: (user: UserProps) => Promise<RegisterUserResponse>;
}