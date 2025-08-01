import { Authentication } from '../../domain/entities/Authentication';
import { AuthenticationModel } from '../../infrastructure/models/mongodb/AuthenticationModel';

export interface AuthenticationRepository {
  findAll: () => Promise<AuthenticationModel[]>;
  findById: (id: string) => Promise<AuthenticationModel | null>;
  findByUserId: (userId: string) => Promise<AuthenticationModel | null>;
  create: (customer: Authentication) => Promise<AuthenticationModel>;
  update: (
    id: string,
    customer: Authentication
  ) => Promise<AuthenticationModel>;
  delete: (id: string) => Promise<AuthenticationModel | null>;
}
