import { HashService } from '../../domain/contracts/HashService';
import { AuthenticationProps } from '../../domain/entities/props/AuthenticationProps';

export interface AuthenticationRepository {
  findBySessionToken: (
    token: string,
    hasher: HashService
  ) => Promise<AuthenticationProps | null>;
  findById: (
    id: string,
    hasher: HashService
  ) => Promise<AuthenticationProps | null>;
  findByUserId: (
    userId: string,
    hasher: HashService
  ) => Promise<AuthenticationProps | null>;
  create: (auth: AuthenticationProps) => Promise<AuthenticationProps>;
  update: (
    id: string,
    auth: AuthenticationProps
  ) => Promise<AuthenticationProps>;
  delete: (id: string) => Promise<boolean>;
}
