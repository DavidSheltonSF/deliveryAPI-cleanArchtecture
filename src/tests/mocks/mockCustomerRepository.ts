import { ObjectId } from 'mongodb';
import { Role } from '../../domain/_enums';
import { UserModel } from '../../infrastructure/models/mongodb/UserModel';
import { CustomerRepository } from '../../application/ports/CustomerRepository';
import { CustomerUser } from '../../domain/entities/CustomerUser';

const mockCustomerData: UserModel[] = [
  {
    _id: new ObjectId(),
    username: 'CustomerTest',
    name: 'CustomerTest',
    email: 'customer@email.com',
    cpf: '14777858547',
    phone: '21965855574',
    role: Role.admin,
    birthday: new Date(),
    createdAt: new Date(),
  },
];

export function mockCustomerRepository(): CustomerRepository {
  const customerRepository = {
    findAll: jest.fn(async () => mockCustomerData),
    findById: jest.fn(async (id: string) => mockCustomerData[0]),
    findByEmail: jest.fn(async (email: string) => mockCustomerData[0]),
    create: jest.fn(async (customer: CustomerUser) => mockCustomerData[0]),
    update: jest.fn(async (customer: CustomerUser) => mockCustomerData[0]),
    delete: jest.fn(async (id: string) => mockCustomerData[0]),
  };

  return customerRepository;
}
