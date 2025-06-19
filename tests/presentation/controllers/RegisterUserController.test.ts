import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { RegisterUserUseCase as RegisterUserUseCase } from '../../../src/application/usecases/user/register-user/RegisterUserUseCase';
import { RegisterUserController } from '../../../src/presentation/controllers/user/RegisterUserController';
import { MockData } from '../../_helpers/mockData';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const registerUserUseCase = new RegisterUserUseCase(spyUserRepository);
  const registerUserController = new RegisterUserController(registerUserUseCase);

  return {spyUserRepository, registerUserController};
}

describe('Testing RegisterUseController', () => {

  test('Should return 200 for good request with correct data', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockCustomerDTO();

    const request = {
      body: mockedUser,
    };

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(201);
  });
  
})