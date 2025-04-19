import { DeleteUserResponse } from "./response";


export interface DeleteUserUseCase {
  delete: (email: string) => Promise<DeleteUserResponse>;
}