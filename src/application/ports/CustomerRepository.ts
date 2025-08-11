import { UserProps } from '../../domain/entities/props/UserProps';

export interface CustomerRepository {
  findAll: () => Promise<UserProps[]>;
  findById: (id: string) => Promise<UserProps | null>;
  findByEmail: (email: string) => Promise<UserProps | null>;
  create: (customer: UserProps) => Promise<UserProps>;
  update: (customer: UserProps) => Promise<UserProps | null>;
  delete: (id: string) => Promise<UserProps | null>;
}
