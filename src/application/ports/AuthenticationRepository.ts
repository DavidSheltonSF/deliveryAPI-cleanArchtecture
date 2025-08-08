import { Authentication } from '../../domain/entities/Authentication';

export interface AuthenticationRepository {
  findBySessionToken: (token: string) => Promise<Authentication | null>;
  findById: (id: string) => Promise<Authentication | null>;
  findByUserId: (userId: string) => Promise<Authentication | null>;
  create: (auth: Authentication) => Promise<Authentication>;
  update: (auth: Authentication) => Promise<Authentication>;
  delete: (id: string) => Promise<Authentication | null>;
}
