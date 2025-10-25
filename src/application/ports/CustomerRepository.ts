import { WithId } from '../../utils/types/WithId';
import { CustomerProps } from '../../domain/entities/props/CustomerProps';

export interface CustomerRepository {
  findAll: () => Promise<WithId<CustomerProps>[]>;
  findById: (id: string) => Promise<WithId<CustomerProps> | null>;
  findByEmail: (email: string) => Promise<WithId<CustomerProps> | null>;
  create: (customer: CustomerProps) => Promise<WithId<CustomerProps>>;
  update: (
    id: string,
    customer: CustomerProps
  ) => Promise<WithId<CustomerProps>>;
  delete: (id: string) => Promise<WithId<CustomerProps>>;
}
