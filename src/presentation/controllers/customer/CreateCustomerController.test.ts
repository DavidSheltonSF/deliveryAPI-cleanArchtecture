import { CreateCustomerController } from './CreateCustomerController';
import { CreateCustomerUseCase } from '../../../application/usecases/customer/CreateCustomer/CreateCustomerUseCase';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../tests/mocks/mockAddressRepository';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import { AddressMocker } from '../../../tests/mocks/AddressMocker';
import {
  customerFakeData,
  addressFakeDara,
} from '../../../tests/mocks/fakeDatabases';
import { Email } from '../../../domain/value-objects';

describe('Testing CreateCustomerController', () => {
  async function makeSut() {
    const userDTO = UserMocker.mockUserDTO();
    const addressDTO = AddressMocker.mockAddressDTO();
    userDTO.address = addressDTO;

    const customerRepository = mockCustomerRepository(customerFakeData);
    const addressRepository = mockAddressRepository(addressFakeDara);
    const hasher = makeMockHasher();
    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );
    const createCustomerController = new CreateCustomerController(useCase);

    return {
      customerRepository,
      addressRepository,
      useCase,
      createCustomerController,
      hasher,
      userDTO,
    };
  }

  test('should return created (201) if everything went well', async () => {
    const { addressRepository, hasher, userDTO } = await makeSut();

    const customerRepository = mockCustomerRepository(customerFakeData, {
      findByEmail: null,
    });

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );

    const createCustomerController = new CreateCustomerController(useCase);
    const httpRequest = {
      body: userDTO,
    };
    const response = await createCustomerController.handle(httpRequest);
    expect(response.statusCode).toBe(201);
  });

  test('should return bad request if no body is provided', async () => {
    const { createCustomerController } = await makeSut();

    const httpRequest = {};

    const response = await createCustomerController.handle(httpRequest);

    expect(response.statusCode).toBe(400);
  });
});
