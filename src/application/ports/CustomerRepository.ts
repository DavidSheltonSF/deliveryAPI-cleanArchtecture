import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';

export interface CustomerRepository {
  findAll: () => Promise<WithId<UserProps>[]>;
  findById: (id: string) => Promise<WithId<UserProps>>;
  findByEmail: (email: string) => Promise<UserProps | null>;
  create: (customer: UserProps) => Promise<WithId<UserProps>>;
  update: (customer: WithId<UserProps>) => Promise<WithId<UserProps>>;
  delete: (id: string) => Promise<WithId<UserProps>>;
}
