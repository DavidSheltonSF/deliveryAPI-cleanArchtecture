import { UserProps} from "../../../../domain/entities/user-props";
import { RegisterUserResponse } from "./response";


export interface RegisterUserUseCase {
  register: (user: UserProps) => Promise<RegisterUserResponse>;
}