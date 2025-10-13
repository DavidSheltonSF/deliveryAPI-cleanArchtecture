import { CustomerRepository } from '../../application/ports/CustomerRepository';
import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';

export function mockCustomerRepository(fakeDataBase: WithId<UserProps>[]): CustomerRepository {
  const customerRepository = {
    findAll: jest.fn(async () => fakeDataBase),
    findById: jest.fn(async (id: string) => fakeDataBase[0]),
    findByEmail: jest.fn(async (email: string) => fakeDataBase[0]),
    create: jest.fn(async (customer: UserProps) => fakeDataBase[0]),
    update: jest.fn(async (id, customer: UserProps) => fakeDataBase[0]),
    delete: jest.fn(async (id: string) => fakeDataBase[0]),
  };

  return customerRepository;
}
