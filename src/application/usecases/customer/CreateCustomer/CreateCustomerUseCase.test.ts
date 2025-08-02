import { ObjectId } from 'mongodb';
import { Role } from '../../../../domain/_enums';
import { CustomerModel } from '../../../../infrastructure/models/mongodb/CustomerModel';
import { CustomerRepository } from '../../../_ports/CustomerRepository';
import { AddressRepository } from '../../../_ports/AddressRepository';
import { AuthenticationRepository } from '../../../_ports/AuthenticationRepository';
import { AddressModel } from '../../../../infrastructure/models/mongodb/AddressModel';
import { AuthenticationModel } from '../../../../infrastructure/models/mongodb/AuthenticationModel';
import { CustomerUser } from '../../../../domain/entities/CustomerUser';
import { Address } from '../../../../domain/entities/Address';
import { Authentication } from '../../../../domain/entities/Authentication';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { makeMockHasher } from '../../../../tests/mocks/mockHasher';
describe('Testing CreateCustomerUserCase', () => {
  const mockCustomerData: CustomerModel[] = [
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

  const mockAddressData: AddressModel[] = [
    {
      _id: new ObjectId(),
      userId: new ObjectId(),
      street: 'Rua Teste',
      city: 'São Paulo',
      state: 'São Paulo',
      zipCode: '21145587',
      createdAt: new Date(),
    },
  ];

  const mockAuthData: AuthenticationModel[] = [
    {
      _id: new ObjectId(),
      userId: new ObjectId(),
      passwordHash: 'fakeHashffsdaa',
      sessionToken: undefined,
      createdAt: new Date(),
    },
  ];

  const customerRepositoryMaker = (): CustomerRepository => ({
    findAll: jest.fn(async () => mockCustomerData),
    findById: jest.fn(async (id: string) => mockCustomerData[0]),
    findByEmail: jest.fn(async (email: string) => mockCustomerData[0]),
    create: jest.fn(async (customer: CustomerUser) => mockCustomerData[0]),
    update: jest.fn(async (customer: CustomerUser) => mockCustomerData[0]),
    delete: jest.fn(async (id: string) => mockCustomerData[0]),
  });

  const addressRepositoryMaker = (): AddressRepository => ({
    findAll: jest.fn(async () => mockAddressData),
    findById: jest.fn(async (id: string) => mockAddressData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAddressData[0]),
    create: jest.fn(async (addres: Address) => mockAddressData[0]),
    update: jest.fn(async (address: Address) => mockAddressData[0]),
    delete: jest.fn(async (id: string) => mockAddressData[0]),
  });

  const authRepositoryMaker = (): AuthenticationRepository => ({
    findAll: jest.fn(async () => mockAuthData),
    findById: jest.fn(async (id: string) => mockAuthData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAuthData[0]),
    create: jest.fn(async (auth: Authentication) => mockAuthData[0]),
    update: jest.fn(async (auth: Authentication) => mockAuthData[0]),
    delete: jest.fn(async (id: string) => mockAuthData[0]),
  });

  const customerRepository = customerRepositoryMaker();
  const addressRepository = addressRepositoryMaker();
  const authRepository = authRepositoryMaker();

  const hasher = makeMockHasher();

  const useCase = new CreateCustomerUseCase(
    customerRepository,
    addressRepository,
    authRepository,
    hasher
  );

  const userDTO = {
    username: 'David',
    name: 'David',
    email: 'david@email.com',
    cpf: '14777858547',
    phone: '21965855574',
    role: 'customer',
    birthday: '2000-01-01',
  };

  const addressDTO = {
    street: 'Rua Teste',
    city: 'São Paulo',
    state: 'São Paulo',
    zipCode: '21145587',
  };

  const authDTO = {
    password: 'ValidPa$$Word12563',
    sessionToken: undefined,
  };

  const createUserDTO: CreateUserDTO = {
    user: userDTO,
    address: addressDTO,
    authentication: authDTO,
  };

  test('Should call CustomerRepository.findByEmail with email provided', async () => {
    await useCase.execute(createUserDTO);
    expect(customerRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
  });

  test('Should call CustomerRepository.create with user data provided', async () => {
    const result = await useCase.execute(createUserDTO);
    expect(customerRepository.create).toHaveBeenCalled();
  })
});
