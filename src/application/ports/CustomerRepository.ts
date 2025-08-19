import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';

export interface CustomerRepository {
  findAll: () => Promise<WithId<UserProps>[]>;
  findById: (id: string) => Promise<WithId<UserProps> | null>;
  findByEmail: (email: string) => Promise<UserProps | null>;
  create: (customer: UserProps) => Promise<WithId<UserProps>>;
  update: (id: string, customer: UserProps) => Promise<WithId<UserProps>>;
  delete: (id: string) => Promise<WithId<UserProps>>;
}
