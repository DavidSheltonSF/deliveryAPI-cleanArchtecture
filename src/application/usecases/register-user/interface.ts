import { UserProps} from "../../../domain/entities/userProps";
import { RegisterUserResponse } from "./response";


export interface RegisterUserUseCase {
  register: (user: UserProps) => Promise<RegisterUserResponse>;
}