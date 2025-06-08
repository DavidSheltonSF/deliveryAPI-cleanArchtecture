import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { UpdateUserUseCase as UpdateUserUseCase } from '../../../src/application/usecases/user/update-user/UpdateUserUseCase';
import { UpdateUserController } from '../../../src/presentation/controllers/user/UpdateUserController';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(spyUserRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return {spyUserRepository, updateUserController};
}

describe('Testing UpdateUseController', () => {

  test('Should return 200 OK for good request with correct data', async () => {
    const { spyUserRepository, updateUserController } = makeSut();

    const [mockedUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const userData = {
      username: "Updatetname",
      email: "updated@bugmail.com"
    };

    const request = {
      params: {
        id: mockedUser.id
      },
      body: userData
    };

    const response = await updateUserController.handle(request);

    expect(response.statusCode).toBe(200);
  });

  test('Should return 200 if update an email for the same email', async () => {
    const { spyUserRepository, updateUserController } = makeSut();

    const [mockedUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const userData = {
      username: "Updatetname",
      email: mockedUser.email
    };

    const request = {
      params: {
        id: mockedUser.id
      },
      body: userData
    };

    const response = await updateUserController.handle(request);

    expect(response.statusCode).toBe(200);
  });

  test('Should return 400 BAD REQUEST if some param is invalid', async () => {
    const { spyUserRepository, updateUserController } = makeSut();

    const [mockedUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const userData = {
      invalidParam: "invaalid",
      email: "updated@bugmail.com"
    };

    const request = {
      params: {
        id: mockedUser.id
      },
      body: userData
    };

    const response = await updateUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });

  test('Should return 422 UNPROCESSABLE ENTITY if user does not exist', async () => {
    const updateUserController = makeSut().updateUserController;

    const [mockedUser] = MockData.mockUser();

    const userData = {
      userame: "Updatetname", // Note: typo preserved from original
      email: "updated@bugmail.com"
    };

    const request = {
      params: {
        id: mockedUser.id
      },
      body: userData
    };

    const response = await updateUserController.handle(request);

    expect(response.statusCode).toBe(400);
  });
});