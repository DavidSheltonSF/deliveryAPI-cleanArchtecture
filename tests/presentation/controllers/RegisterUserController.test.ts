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

    const [mockedUser] = MockData.mockUser();
    const {_id, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(201);
  });

  test('Should return 200 for good request but without address(optional param)', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockUser();
    const {_id, address, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(201);
  });

  test('Should return 422 if user already exists', async () => {
    const { registerUserController, spyUserRepository } = makeSut();

    const [mockedUser] = MockData.mockUser();

    // Add the mocked user in the fake database manualy
    spyUserRepository.userDatabase.push(mockedUser);

    const {_id, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(422);
  });

  test('Should return 400 if no name is provided', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockUser();
    const {_id, username, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });

  test('Should return 400 if no email is provided', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockUser();
    const {_id, email, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });

  test('Should return 400 if no phone is provided', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockUser();
    const {_id, phone, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });

  test('Should return 400 if no cpf is provided', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockUser();
    const {_id, cpf, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });

  test('Should return 400 if no authentication is provided', async () => {
    const registerUserController = makeSut().registerUserController;

    const [mockedUser] = MockData.mockUser();
    const {_id, authentication, ...userWithoutId} = mockedUser;

    const request = {
      body: userWithoutId
    }

    const response = await registerUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });
  
})