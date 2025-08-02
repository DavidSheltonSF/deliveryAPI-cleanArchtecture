import { CustomerRepository } from '../../../_ports/CustomerRepository';
import { AddressRepository } from '../../../_ports/AddressRepository';
import { AuthenticationRepository } from '../../../_ports/AuthenticationRepository';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { makeMockHasher } from '../../../../tests/mocks/mockHasher';
import { HashService } from '../../../../domain/contracts/HashService';
import {
  mockCustomerRepository,
  mockCustomerRepositoryWithDuplicatedEmail,
} from '../../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../../tests/mocks/mockAddressRepository';
import { mockAuthRepository } from '../../../../tests/mocks/mockAuthenticationRepository';

describe('Testing CreateCustomerUserCase', () => {
  const customerRepository = mockCustomerRepository();
  const addressRepository = mockAddressRepository();
  const authRepository = mockAuthRepository();
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

    const customerRepository =
      mockCustomerRepositoryWithDuplicatedEmail(duplicatedEmail);

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
