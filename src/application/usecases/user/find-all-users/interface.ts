import { FindUsersResponse } from "./response";


export interface FindAllUsersUseCase {
  execute: () => Promise<FindUsersResponse>;
}