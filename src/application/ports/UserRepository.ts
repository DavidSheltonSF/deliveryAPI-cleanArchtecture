import { WithId } from '../../utils/types/WithId';
import { CustomerProps } from '../../domain/entities/props/CustomerProps';

export interface UserRepository {
  findAll: () => Promise<WithId<CustomerProps>[]>;
  findById: (id: string) => Promise<WithId<CustomerProps> | null>;
  findByEmail: (email: string) => Promise<WithId<CustomerProps> | null>;
  create: (user: CustomerProps) => Promise<WithId<CustomerProps>>;
  update: (id: string, email: CustomerProps) => Promise<WithId<CustomerProps>>;
  delete: (id: string) => Promise<WithId<CustomerProps>>;
}
