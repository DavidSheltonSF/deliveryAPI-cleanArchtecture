import { CreateCustomerController } from './CreateCustomerController';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../tests/mocks/mockAddressRepository';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import {
  customerFakeData,
  addressFakeDara,
} from '../../../tests/mocks/fakeDatabases';
import { MockedCreateCustomerUseCase } from '../../../tests/MockCreateCustomerUseCase';

describe('Testing CreateCustomerController', () => {
  async function makeSut() {
    const customerDTO = UserMocker.mockCustomerDTO();

    const customerRepository = mockCustomerRepository(customerFakeData);
    const addressRepository = mockAddressRepository(addressFakeDara);
    const hasher = makeMockHasher();
    const useCase = new MockedCreateCustomerUseCase(
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
      customerDTO,
    };
  }

  test('should return created (201) if everything went well', async () => {
    const { addressRepository, hasher, customerDTO } = await makeSut();

    const customerRepository = mockCustomerRepository(customerFakeData, {
      findByEmail: null,
    });

    const useCase = new MockedCreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );

    const createCustomerController = new CreateCustomerController(useCase);
    const httpRequest = {
      body: customerDTO,
    };
    const response = await createCustomerController.handle(httpRequest);
    expect(response.statusCode).toBe(201);
    expect(useCase.calledWith(httpRequest.body)).toBeTruthy();
  });

  test('should return bad request if no body is provided', async () => {
    const { createCustomerController } = await makeSut();

    const httpRequest = {};

    const response = await createCustomerController.handle(httpRequest);

    expect(response.statusCode).toBe(400);
  });
});
