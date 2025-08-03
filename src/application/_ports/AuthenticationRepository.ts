import { Authentication } from '../../domain/entities/Authentication';
import { AuthenticationModel } from '../../infrastructure/models/mongodb/AuthenticationModel';

export interface AuthenticationRepository {
  findAll: () => Promise<AuthenticationModel[]>;
  findBySessionToken: () => Promise<AuthenticationModel | null>;
  findById: (id: string) => Promise<AuthenticationModel | null>;
  findByUserId: (userId: string) => Promise<AuthenticationModel | null>;
  create: (auth: Authentication) => Promise<AuthenticationModel>;
  update: (auth: Authentication) => Promise<AuthenticationModel>;
  delete: (id: string) => Promise<AuthenticationModel | null>;
}
