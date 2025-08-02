import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { CreateUserDTO } from '../../../../presentation/dtos/CreateUserDTO';
import { makeMockHasher } from '../../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../../tests/mocks/mockAddressRepository';
import { mockAuthRepository } from '../../../../tests/mocks/mockAuthenticationRepository';
import { UserMocker } from '../../../../tests/mocks/UserMocker';
import { AddressMocker } from '../../../../tests/mocks/AddressMocker';
import { AuthenticationMocker } from '../../../../tests/mocks/AuthenticationMocker';

describe('Testing CreateCustomerUserCase', () => {
  const userDTO = UserMocker.mockUserDTO();
  const addressDTO = AddressMocker.mockAddressDTO();
  const authDTO = AuthenticationMocker.mockAuthenticationDTO();
  const createUserDTO: CreateUserDTO = {
    user: userDTO,
    address: addressDTO,
    authentication: authDTO,
  };

  function makeSut() {
    const customerRepository = mockCustomerRepository();
    const addressRepository = mockAddressRepository();
    const authenticationRepository = mockAuthRepository();
    const hasher = makeMockHasher();

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      authenticationRepository,
      hasher
    );

    return {
      useCase,
      customerRepository,
      addressRepository,
      authenticationRepository,
      hasher,
    };
  }

  test('should return Right when valid data is provided', async () => {
    const { useCase } = makeSut();

    const responseOrError = await useCase.execute(createUserDTO);
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should call CustomerRepository.findByEmail with the provided email', async () => {
    const { useCase, customerRepository } = makeSut();

    await useCase.execute(createUserDTO);
    expect(customerRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
  });

  test('should call create method of all repositories', async () => {
    const {
      useCase,
      customerRepository,
      addressRepository,
      authenticationRepository,
    } = makeSut();

    await useCase.execute(createUserDTO);

    expect(customerRepository.create).toHaveBeenCalled();
    expect(addressRepository.create).toHaveBeenCalled();
    expect(authenticationRepository.create).toHaveBeenCalled();
  });

  test('should return error when a duplicated email is found', async () => {
    const duplicatedEmail = 'jojo@email.com';

    const createCustomerData = {
      ...createUserDTO,
    };
    createCustomerData.user.email = duplicatedEmail;

    const {
      customerRepository,
      addressRepository,
      authenticationRepository,
      hasher,
    } = makeSut();

    // Modify the return of .findByEmail this time
    (customerRepository.findByEmail as jest.Mock).mockResolvedValueOnce({
      _id: 'sfafdaf',
      email: duplicatedEmail,
    });

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      authenticationRepository,
      hasher
    );

    const responseOrError = await useCase.execute(createCustomerData);

    expect(responseOrError.isLeft()).toBeTruthy();
  });
});
