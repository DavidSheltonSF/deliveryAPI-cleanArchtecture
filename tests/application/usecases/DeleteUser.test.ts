import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { DeleteUser } from '../../../src/application/usecases/user/delete-user/DeleteUser';
import { MockData } from '../../_helpers/mockData';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const deleteUserUseCase = new DeleteUser(spyUserRepository);

  return {
    deleteUserUseCase,
    spyUserRepository
  }
}

describe('Testing DeleteUserUseCase', () => {

  test('Should delete a user', async () => {
    const { deleteUserUseCase, spyUserRepository } = makeSut();

    const mockedUser = MockData.mockUser();

    const userStrId = mockedUser._id?.toString();

    if (!userStrId) {
      throw new Error('User ID is undefined');
    }

    // Adding the user in the fake dadabase manualy
    spyUserRepository.userDatabase.push(mockedUser);

    const response = await deleteUserUseCase.execute(userStrId);

    expect(response.isRight()).toBeTruthy()
    expect(spyUserRepository.removeParams.userId).toBe(userStrId);
  });

  test('Should throw an error if user does not exist', async () => {
    const deleteUserUseCase = makeSut().deleteUserUseCase;

    const mockedUser = MockData.mockUser();

    const userStrId = mockedUser._id?.toString();

    if (!userStrId) {
      throw new Error('User ID is undefined');
    }

    const response = await deleteUserUseCase.execute(userStrId);

    expect(response.isLeft()).toBeTruthy();
  })
})