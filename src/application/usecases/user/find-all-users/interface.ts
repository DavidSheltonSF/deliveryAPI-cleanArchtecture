import { FindAllUsersResponse } from "./response";


export interface FindAllUsersUseCase {
  execute: () => Promise<FindAllUsersResponse>;
}