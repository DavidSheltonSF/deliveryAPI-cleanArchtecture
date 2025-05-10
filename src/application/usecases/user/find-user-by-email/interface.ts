import { FindUserByEmailResponse } from "./response";

export interface FindUserByEmailUseCase {
  execute: (email: string) => Promise<FindUserByEmailResponse>;
}
