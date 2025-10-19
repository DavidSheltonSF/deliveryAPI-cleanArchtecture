import { CustomerRepository } from '../../application/ports/CustomerRepository';
import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';

interface MockRepoReturnConfig {
  findAll?: WithId<UserProps>[];
  findById?: WithId<UserProps> | null;
  findByEmail?: WithId<UserProps> | null;
  create?: WithId<UserProps> | null;
  update?: WithId<UserProps> | null;
  delete?: WithId<UserProps> | null;
}

export function mockCustomerRepository(
  fakeDataBase: WithId<UserProps>[],
  customReturn?: MockRepoReturnConfig 
  
): CustomerRepository {
  const defaultConfig: MockRepoReturnConfig = {
    findAll: fakeDataBase,
    findById: fakeDataBase[0],
    findByEmail: fakeDataBase[0],
    create: fakeDataBase[0],
    update: fakeDataBase[0],
    delete: fakeDataBase[0],
  };

  let returnConfig = {...defaultConfig, ...customReturn}

  const customerRepository = {
    findAll: jest.fn(async () => returnConfig.findAll),
    findById: jest.fn(async (id: string) => returnConfig.findById),
    findByEmail: jest.fn(async (email: string) => returnConfig.findByEmail),
    create: jest.fn(async (customer: UserProps) => returnConfig.create),
    update: jest.fn(async (id, customer: UserProps) => returnConfig.update),
    delete: jest.fn(async (id: string) => returnConfig.delete),
  };
  return customerRepository;
}
