import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { makeMockHasher } from '../../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../../tests/mocks/mockAddressRepository';
import { UserMocker } from '../../../../tests/mocks/UserMocker';
import { AddressMocker } from '../../../../tests/mocks/AddressMocker';
import { Email } from '../../../../domain/value-objects';
import {
  customerFakeData,
  addressFakeDara,
} from '../../../../tests/mocks/fakeDatabases';

describe('Testing CreateCustomerUserCase', () => {
  const userDTO = UserMocker.mockUserDTO();
  const addressDTO = AddressMocker.mockAddressDTO();
  userDTO.address = addressDTO;

  async function makeSut() {
    const customerRepository = mockCustomerRepository(customerFakeData);
    const addressRepository = mockAddressRepository(addressFakeDara);
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
    const {addressRepository, hasher } = await makeSut();

    const customerRepository = mockCustomerRepository(customerFakeData, {findByEmail: null})

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );

    const responseOrError = await useCase.execute(userDTO);
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should call CustomerRepository.findByEmail with the provided email', async () => {
    const { customerRepository, addressRepository, hasher, useCase } = await makeSut();

    await useCase.execute(userDTO);
    expect(customerRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
  });

  test('should call create method of all repositories', async () => {
     const { addressRepository, hasher } = await makeSut();

     const customerRepository = mockCustomerRepository(customerFakeData, {findByEmail: null});

     const useCase = new CreateCustomerUseCase(
       customerRepository,
       addressRepository,
       hasher
     );
    await useCase.execute(userDTO);

    expect(customerRepository.create).toHaveBeenCalled();
    expect(addressRepository.create).toHaveBeenCalled();
  });

  test('should return error when a duplicated email is found', async () => {
    const duplicatedEmail = 'jojo@email.com';

    const createCustomerData = {
      ...userDTO,
    };
    createCustomerData.email = duplicatedEmail;

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
