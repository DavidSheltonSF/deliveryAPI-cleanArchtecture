import { FindUserByEmailResponse } from "./response";

export interface FindUserByEmail {
  execute: (email: string) => Promise<FindUserByEmailResponse>;
}
