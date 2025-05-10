import { DeleteUserResponse } from "./response";

export interface DeleteUserUseCase {
  execute: (id: string) => Promise<DeleteUserResponse>;
}