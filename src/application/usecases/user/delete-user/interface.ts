import { DeleteUserResponse } from "./response";

export interface DeleteUser {
  execute: (id: string) => Promise<DeleteUserResponse>;
}