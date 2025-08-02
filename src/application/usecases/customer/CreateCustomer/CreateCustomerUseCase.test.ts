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
import { HashService } from '../../../../domain/contracts/HashService';
import {mockCustomerRepositoryWithDuplicatedEmail} from '../../../../tests/mocks/mockCustomerRepository'
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

  const makeCustomerRepository = (): CustomerRepository => ({
    findAll: jest.fn(async () => mockCustomerData),
    findById: jest.fn(async (id: string) => mockCustomerData[0]),
    findByEmail: jest.fn(async (email: string) => mockCustomerData[0]),
    create: jest.fn(async (customer: CustomerUser) => mockCustomerData[0]),
    update: jest.fn(async (customer: CustomerUser) => mockCustomerData[0]),
    delete: jest.fn(async (id: string) => mockCustomerData[0]),
  });

  const makeAddressRepository = (): AddressRepository => ({
    findAll: jest.fn(async () => mockAddressData),
    findById: jest.fn(async (id: string) => mockAddressData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAddressData[0]),
    create: jest.fn(async (addres: Address) => mockAddressData[0]),
    update: jest.fn(async (address: Address) => mockAddressData[0]),
    delete: jest.fn(async (id: string) => mockAddressData[0]),
  });

  const makeAuthRepository = (): AuthenticationRepository => ({
    findAll: jest.fn(async () => mockAuthData),
    findById: jest.fn(async (id: string) => mockAuthData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAuthData[0]),
    create: jest.fn(async (auth: Authentication) => mockAuthData[0]),
    update: jest.fn(async (auth: Authentication) => mockAuthData[0]),
    delete: jest.fn(async (id: string) => mockAuthData[0]),
  });

  const customerRepository = makeCustomerRepository();
  const addressRepository = makeAddressRepository();
  const authRepository = makeAuthRepository();

  const hasher = makeMockHasher();

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

  function makeCreateCustomerUseCase(
    customerRepo: CustomerRepository,
    addressRepo: AddressRepository,
    authRepo: AuthenticationRepository,
    hasher: HashService
  ) {
    return new CreateCustomerUseCase(
      customerRepo,
      addressRepo,
      authRepo,
      hasher
    );
  }

  test('should return Right when valid data is provided', async () => {
    const useCase = makeCreateCustomerUseCase(
      customerRepository,
      addressRepository,
      authRepository,
      hasher
    );

    const responseOrError = await useCase.execute(createUserDTO);
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should call CustomerRepository.findByEmail with the provided email', async () => {
    const useCase = makeCreateCustomerUseCase(
      customerRepository,
      addressRepository,
      authRepository,
      hasher
    );
    await useCase.execute(createUserDTO);
    expect(customerRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
  });

  test('should call create method of all repositories with domain entities containing data provided', async () => {
    // Only Address entity does not modify the data it receives
    // so it's possible to use addressDTO directly in the tests
    const customerEntityData = {
      ...userDTO,
      birthday: new Date(userDTO.birthday),
    };
    const authEntityData = {
      passwordHash: await hasher.hash(authDTO.password),
      sessionToken: authDTO.sessionToken,
    };

    const useCase = makeCreateCustomerUseCase(
      customerRepository,
      addressRepository,
      authRepository,
      hasher
    );

    await useCase.execute(createUserDTO);

    expect(customerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(customerEntityData)
    );
    expect(addressRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(addressDTO)
    );
    expect(authRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(authEntityData)
    );
  });

  test('should return error when a duplicated email is found', async () => {
    const duplicatedEmail = 'jojo@email.com';

    const createCustomerData = {
      ...createUserDTO,
    };
    createCustomerData.user.email = duplicatedEmail;

    const customerRepository = mockCustomerRepositoryWithDuplicatedEmail(duplicatedEmail)

    const useCase = makeCreateCustomerUseCase(
      customerRepository,
      addressRepository,
      authRepository,
      hasher
    );

    const responseOrError = await useCase.execute(createCustomerData);

    expect(responseOrError.isLeft()).toBeTruthy();
  });
});
