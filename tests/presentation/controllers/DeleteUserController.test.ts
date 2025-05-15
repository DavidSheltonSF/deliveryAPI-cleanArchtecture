import { SpyUserRepository } from '../../application/_in-memory-repositories/spy-user-repository';
import { DeleteUserUseCase as DeleteUserUseCase } from '../../../src/application/usecases/user/delete-user/DeleteUserUseCase';
import { DeleteUserController } from '../../../src/presentation/controllers/user/DeleteUserController';
import { MockData } from '../../_helpers/mockData';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(spyUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return {spyUserRepository, deleteUserController};
}

describe('Testing DeleteUseController', () => {

  test('Should return 204 if the operation was successfull', async () => {
    const {deleteUserController, spyUserRepository } = makeSut();

    const mockedUsers = MockData.mockUser(2);
    
    spyUserRepository.userDatabase.push(mockedUsers[0]);
    spyUserRepository.userDatabase.push(mockedUsers[1]);

    const request = {
      params: {
        id: mockedUsers[1]._id
      }
    }

    const response = await deleteUserController.handle(request);

    expect(response.statusCode).toBe(204);
  });

  
  test('Should return 400 if no id is provided', async () => {
    const deleteUserController = makeSut().deleteUserController;

    const requestWithoutId = {params: {}}

    const response = await deleteUserController.handle(requestWithoutId);

    expect(response.statusCode).toBe(400);
  });
  

  test('Should return 422 if user does not exist', async () => {
    const {deleteUserController, spyUserRepository } = makeSut();

    const mockedUsers = MockData.mockUser(2);
    
    // adding user0 only
    spyUserRepository.userDatabase.push(mockedUsers[0]);
  
    // Request with a unexisting user id
    const request = {
      params: {
        id: mockedUsers[1]._id
      }
    }

    const response = await deleteUserController.handle(request);

    expect(response.statusCode).toBe(422);
  });
  
})