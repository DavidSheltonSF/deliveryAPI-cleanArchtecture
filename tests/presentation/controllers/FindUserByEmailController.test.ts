import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { FindUserByEmailUseCase } from '../../../src/application/usecases/user/find-user-by-email/FindUserByEmailUseCase';
import { FindUserByEmailController } from '../../../src/presentation/controllers/user/FindUserByEmailController';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findUserByEmailUseCase = new FindUserByEmailUseCase(spyUserRepository);
  const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);

  return {spyUserRepository, findUserByEmailController};
}

describe('Testing DeleteUseController', () => {

  test('should return 200 OK and the correct user when a valid eail is provided', async () => {
    const {findUserByEmailController, spyUserRepository } = makeSut();

    const mockedUsers = MockData.mockUser(2);
    const targetUser = mockedUsers[0]
    
    spyUserRepository.userDatabase.push(...mockedUsers);

    const request = {
      params: {
        email: targetUser.email?.toString()
      }
    }

    const response = await findUserByEmailController.handle(request);
    const foundUser = response.body

    expect(response.statusCode).toBe(200);
    expect(foundUser.email).toBe(targetUser.email);
    expect(foundUser.username).toBe(targetUser.username);
    expect(foundUser.email).toBe(targetUser.email);
  });


  test('should return 404 NOT FOUND when a valid email is provided but the user is not found', async () => {
    const findUserByEmailController = makeSut().findUserByEmailController;

    const [mokedUser] = MockData.mockUser();

    const request = {
      params: {
        email: mokedUser.email?.toString()
      }
    }

    const response = await findUserByEmailController.handle(request);

    expect(response.statusCode).toBe(404);
  });
  
  test('should return 400 BAD REQUEST when email was not provided', async () => {
    const findUserByEmailController = makeSut().findUserByEmailController;

    const request = {
      params: {}
    }

    const response = await findUserByEmailController.handle(request);

    expect(response.statusCode).toBe(400);
  });

  test('should return 422 UNPROCESSABLE ENTITY when the email provided is invalemail', async () => {
    const findUserByEmailController = makeSut().findUserByEmailController;

    const request = {
      params: {
        email: "invalemailEMAIL"
      }
    }

    const response = await findUserByEmailController.handle(request);

    expect(response.statusCode).toBe(422);
  });
})