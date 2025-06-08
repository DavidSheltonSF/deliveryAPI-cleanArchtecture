import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { FindAllUsersUseCase } from '../../../src/application/usecases/user/find-all-users/FindAllUsersUseCase';
import { FindAllUsersController } from '../../../src/presentation/controllers/user/FindAllUsersController';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findAllUsersUseCase = new FindAllUsersUseCase(spyUserRepository);
  const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);

  return {spyUserRepository, findAllUsersController};
}

describe('Testing DeleteUseController', () => {

  test('Should return 200 OK and all users data', async () => {
    const {findAllUsersController, spyUserRepository } = makeSut();

    const mockedUsers = MockData.mockUser(2);
    
    spyUserRepository.userDatabase.push(mockedUsers[0]);
    spyUserRepository.userDatabase.push(mockedUsers[1]);

    const request = {}

    const response = await findAllUsersController.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toBe(mockedUsers[0].id);
    expect(response.body[0].username).toBe(mockedUsers[0].username);
    expect(response.body[0].email).toBe(mockedUsers[0].email);

    expect(response.body[1].id).toBe(mockedUsers[1].id);
    expect(response.body[1].username).toBe(mockedUsers[1].username);
    expect(response.body[1].email).toBe(mockedUsers[1].email);

  });
  
})