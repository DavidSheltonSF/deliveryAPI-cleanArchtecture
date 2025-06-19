import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { RegisterUserUseCase as RegisterUserUseCase } from '../../../src/application/usecases/user/register-user/RegisterUserUseCase';
import { RegisterCustomerController } from '../../../src/presentation/controllers/customer/RegisterCustomerController';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const registerUserUseCase = new RegisterUserUseCase(spyUserRepository);
  const registerCustomerController = new RegisterCustomerController(
    registerUserUseCase
  );

  return { spyUserRepository, registerCustomerController };
};

describe('Testing RegisterUseController', () => {
  test('Should return 200 for good request with correct data', async () => {
    const registerCustomerController = makeSut().registerCustomerController;

    const [mockedUser] = MockData.mockCustomerDTO();

    const request = {
      body: mockedUser,
    };

    const response = await registerCustomerController.handle(request);

    expect(response.statusCode).toBe(201);
  });
});
