import { FindAllUsersResponse } from "./response";


export interface FindAllUsers {
  execute: () => Promise<FindAllUsersResponse>;
}