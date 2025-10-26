import { CreateCustomerController } from './CreateCustomerController';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import { MockCustomerRepository } from '../../../tests/MockCustomerRepository'
import { MockAddressRepository } from '../../../tests/MockAddressRepository';
import { MockedCreateCustomerUseCase } from '../../../tests/MockCreateCustomerUseCase';
import { Email } from '../../../domain/value-objects';

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
    expect(response.statusCode).toBe(400);
    expect(response.body.name).toBe('MissingFieldError');
  });

  test('should return unprocessable entity if duplicated email is provided in the request', async () => {
    const { addressRepository, hasher } = await makeSut();

    const customer = UserMocker.mockCustomerPropsWithId();
    const duplicatedEmail = customer.email.getValue();

    const customerRepository = new MockCustomerRepository({
      findByEmail: customer,
    });

    const newCustomer = UserMocker.mockCustomerDTO();
    newCustomer.email = duplicatedEmail;

    const createCustomerUseCase = new MockedCreateCustomerUseCase(customerRepository, addressRepository, hasher);
    const createCustomerController = new CreateCustomerController(createCustomerUseCase);

    const httpRequest = {
      body: newCustomer
    }

    const response = await createCustomerController.handle(httpRequest)

    expect(response.statusCode).toBe(422);
    expect(response.body.name).toBe('DuplicatedDataError');
  })
});
