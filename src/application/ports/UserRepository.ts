import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';

export interface UserRepository {
  findAll: () => Promise<WithId<UserProps>[]>;
  findById: (id: string) => Promise<WithId<UserProps> | null>;
  findByEmail: (email: string) => Promise<WithId<UserProps> | null>;
  create: (user: UserProps) => Promise<WithId<UserProps>>;
  update: (id: string, email: UserProps) => Promise<WithId<UserProps>>;
  delete: (id: string) => Promise<WithId<UserProps>>;
}
