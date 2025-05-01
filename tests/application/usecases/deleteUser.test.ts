import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { DeleteUser } from '../../../src/application/usecases/delete-user/deleteUser';
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

    await deleteUserUseCase.delete(userStrId);

    expect(spyUserRepository.removeParams.userId).toBe(userStrId);
  });

})