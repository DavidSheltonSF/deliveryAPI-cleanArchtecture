import { DeleteUserResponse } from "./response";

export interface DeleteUserUseCase {
  delete: (id: string) => Promise<DeleteUserResponse>;
}