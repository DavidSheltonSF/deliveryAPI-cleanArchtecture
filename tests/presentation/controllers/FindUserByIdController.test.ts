import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { FindUserByIdUseCase } from '../../../src/application/usecases/user/find-user-by-id/FindUserByIdUseCase';
import { FindUserByIdController } from '../../../src/presentation/controllers/user/FindUserByIdController';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(spyUserRepository);
  const findUserByIdController = new FindUserByIdController(findUserByIdUseCase);

  return {spyUserRepository, findUserByIdController};
}

describe('Testing DeleteUseController', () => {

  test('should return 200 OK and the correct user when a valid user ID is provided', async () => {
    const {findUserByIdController, spyUserRepository } = makeSut();

    const mockedUsers = MockData.mockUser(2);
    const targetUser = mockedUsers[0]
    
    spyUserRepository.userDatabase.push(...mockedUsers);

    const request = {
      params: {
        id: targetUser._id?.toString()
      }
    }

    const response = await findUserByIdController.handle(request);
    const foundUser = response.body

    expect(response.statusCode).toBe(200);
    expect(foundUser._id).toBe(targetUser._id);
    expect(foundUser.username).toBe(targetUser.username);
    expect(foundUser.email).toBe(targetUser.email);
  });


  test('should return 404 NOT FOUND when a valid user ID is provided but the user is not found', async () => {
    const findUserByIdController = makeSut().findUserByIdController;

    const [mokedUser] = MockData.mockUser();

    const request = {
      params: {
        id: mokedUser._id?.toString()
      }
    }

    const response = await findUserByIdController.handle(request);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found')
  });
  
  test('should return 400 BAD REQUEST when ID was not provided', async () => {
    const findUserByIdController = makeSut().findUserByIdController;

    const request = {
      params: {}
    }

    const response = await findUserByIdController.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Missing param: id');
  });

  test('should return 422 UNPROCESSABLE ENTITY when the ID provided is invalid', async () => {
    const findUserByIdController = makeSut().findUserByIdController;

    const request = {
      params: {
        id: "invalidID"
      }
    }

    const response = await findUserByIdController.handle(request);

    expect(response.statusCode).toBe(422);
    expect(response.body.message).toBe(`The ID ${request.params.id} is invalid`);
  });
})