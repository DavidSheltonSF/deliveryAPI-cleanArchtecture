import { FindUserByIdResponse } from "./response";

export interface FindUserByIdUseCase {
  execute: (id: string) => Promise<FindUserByIdResponse>;
}