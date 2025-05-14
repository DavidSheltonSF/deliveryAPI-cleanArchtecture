import { FindUserByIdResponse } from "./response";

export interface FindUserById {
  execute: (id: string) => Promise<FindUserByIdResponse>;
}