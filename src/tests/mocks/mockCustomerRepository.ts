import { ObjectId } from 'mongodb';
import { Role } from '../../domain/_enums';
import { CustomerRepository } from '../../application/ports/CustomerRepository';
import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';
import { Birthday, Cpf, Email, Name, Password, Phone } from '../../domain/value-objects';

const mockCustomerData: WithId<UserProps>[] = [
  {
    id: new ObjectId().toString(),
    firstName: Name.createFromPersistence('CustomerTest'),
    lastName: Name.createFromPersistence('CustomerTest'),
    email: Email.createFromPersistence('customer@email.com'),
    cpf: Cpf.createFromPersistence('52144858745'),
    phone: Phone.createFromPersistence('21965855574'),
    role: Role.admin,
    birthday: Birthday.createFromPersistence(new Date()),
    passwordHash: Password.createFromPersistence('fakeHas4$$%@$2hemkqmrkq')
  },
];

export function mockCustomerRepository(): CustomerRepository {
  const customerRepository = {
    findAll: jest.fn(async () => mockCustomerData),
    findById: jest.fn(async (id: string) => mockCustomerData[0]),
    findByEmail: jest.fn(async (email: string) => mockCustomerData[0]),
    create: jest.fn(async (customer: UserProps) => mockCustomerData[0]),
    update: jest.fn(async (id, customer: UserProps) => mockCustomerData[0]),
    delete: jest.fn(async (id: string) => mockCustomerData[0]),
  };

  return customerRepository;
}
