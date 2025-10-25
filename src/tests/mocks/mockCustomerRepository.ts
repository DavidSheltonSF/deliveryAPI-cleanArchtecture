import { CustomerRepository } from '../../application/ports/CustomerRepository';
import { WithId } from '../../utils/types/WithId';
import { CustomerProps } from '../../domain/entities/props/CustomerProps';

interface MockRepoReturnConfig {
  findAll?: WithId<CustomerProps>[];
  findById?: WithId<CustomerProps> | null;
  findByEmail?: WithId<CustomerProps> | null;
  create?: WithId<CustomerProps> | null;
  update?: WithId<CustomerProps> | null;
  delete?: WithId<CustomerProps> | null;
}

export function mockCustomerRepository(
  fakeDataBase: WithId<CustomerProps>[],
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
    create: jest.fn(async (customer: CustomerProps) => returnConfig.create),
    update: jest.fn(async (id, customer: CustomerProps) => returnConfig.update),
    delete: jest.fn(async (id: string) => returnConfig.delete),
  };
  return customerRepository;
}
