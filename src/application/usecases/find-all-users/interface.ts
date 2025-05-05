import { UserProps } from "../../../domain/entities/user-props";
import { FindUsersResponse } from "./response";


export interface FindUsersUseCase {
  execute: () => Promise<FindUsersResponse>;
}