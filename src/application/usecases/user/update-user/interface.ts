import { UserProps} from "../../../../domain/entities/user-props";
import { UpdateUserResponse } from "./response";

export interface UpdateUserUseCase {
  execute: (id: string, userData: Omit<UserProps, "_id">) => Promise<UpdateUserResponse>;
}