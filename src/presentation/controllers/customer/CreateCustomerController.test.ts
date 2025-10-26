import { CreateCustomerController } from './CreateCustomerController';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import { MockCustomerRepository } from '../../../tests/MockCustomerRepository'
import { MockAddressRepository } from '../../../tests/MockAddressRepository';
import { MockedCreateCustomerUseCase } from '../../../tests/MockCreateCustomerUseCase';

describe('Testing CreateCustomerController', () => {
  async function makeSut() {
    const customerDTO = UserMocker.mockCustomerDTO();

    const customerRepository = new MockCustomerRepository()
    const addressRepository = new MockAddressRepository()
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

  test('should return created (201) if everything goes well', async () => {
    const { addressRepository, hasher, customerDTO } = await makeSut();

    const customerRepository = new MockCustomerRepository({findByEmail: null});

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

  test('should return bad request if any required field is missing', async () => {
    const { createCustomerController } = await makeSut();

    const httpRequest = {
      body: {
        firstName: 'David',
        lastName: 'Fabio',
      }
    }

    const response = await createCustomerController.handle(httpRequest);
    console.log(response)
    expect(response.statusCode).toBe(400);
    expect(response.body.name).toBe('MissingFieldError');
  })
});
