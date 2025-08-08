import { HashService } from '../../domain/contracts/HashService';
import { Authentication } from '../../domain/entities/Authentication';

export interface AuthenticationRepository {
  findBySessionToken: (
    token: string,
    hasher: HashService
  ) => Promise<Authentication | null>;
  findById: (id: string, hasher: HashService) => Promise<Authentication | null>;
  findByUserId: (
    userId: string,
    hasher: HashService
  ) => Promise<Authentication | null>;
  create: (auth: Authentication) => Promise<Authentication>;
  update: (auth: Authentication) => Promise<Authentication>;
  delete: (id: string) => Promise<boolean>;
}
