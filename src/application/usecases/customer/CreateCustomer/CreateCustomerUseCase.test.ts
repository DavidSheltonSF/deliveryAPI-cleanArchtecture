import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { CreateCustomerDTO } from '../../../../presentation/dtos/CreateCustomerDTO';
import { makeMockHasher } from '../../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../../tests/mocks/mockAddressRepository';
import { UserMocker } from '../../../../tests/mocks/UserMocker';
import { AddressMocker } from '../../../../tests/mocks/AddressMocker';
import { Email } from '../../../../domain/value-objects';

describe('Testing CreateCustomerUserCase', () => {
  const userDTO = UserMocker.mockUserDTO();
  const addressDTO = AddressMocker.mockAddressDTO();
  const createUserDTO: CreateCustomerDTO = {
    user: userDTO,
    address: addressDTO,
  };

  async function makeSut() {
    const customerRepository = mockCustomerRepository();
    const addressRepository = mockAddressRepository();
    const hasher = makeMockHasher();

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );

    return {
      useCase,
      customerRepository,
      addressRepository,
      hasher,
    };
  }

  test('should return Right when valid data is provided', async () => {
    const { useCase } = await makeSut();

    const responseOrError = await useCase.execute(createUserDTO);
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should call CustomerRepository.findByEmail with the provided email', async () => {
    const { useCase, customerRepository } = await makeSut();

    await useCase.execute(createUserDTO);
    expect(customerRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
  });

  test('should call create method of all repositories', async () => {
    const {
      useCase,
      customerRepository,
      addressRepository,
    } = await makeSut();

    await useCase.execute(createUserDTO);

    expect(customerRepository.create).toHaveBeenCalled();
    expect(addressRepository.create).toHaveBeenCalled();
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
      hasher,
    } = await makeSut();

    // Modify the return of .findByEmail this time
    (customerRepository.findByEmail as jest.Mock).mockResolvedValueOnce({
      email: Email.createFromPersistence(duplicatedEmail),
    });

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );

    const responseOrError = await useCase.execute(createCustomerData);

    expect(responseOrError.isLeft()).toBeTruthy();
  });
});
