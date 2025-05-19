import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { UpdateUserUseCase } from '../../../src/application/usecases/user/update-user/UpdateUserUseCase';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const updateUser = new UpdateUserUseCase(spyUserRepository);

  return {
    updateUser,
    spyUserRepository
  }
}

describe('Testing UpdateUserUseCase', () => {

  test('Should update only the username', async () => {
    const {spyUserRepository, updateUser } = makeSut()

    const [mockedUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const userIdStr = mockedUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not a valid string');
    } 

    const update = {
      username: 'updatedName'
    }

    const response = await updateUser.execute(userIdStr, update);

    expect(spyUserRepository.updateParams.userId).toBe(userIdStr);
    expect(spyUserRepository.updateParams.userData?.username).toBe(update.username);
  });


  test('Should return DuplicatedDataError when updating email to one already associated to another user', async () => {
    const {spyUserRepository, updateUser } = makeSut()


    const [firstUser] = MockData.mockUser();
    const [secondUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(firstUser);
    spyUserRepository.userDatabase.push(secondUser);

    // Update the email of secondUser to the same email as firstUser
    const update = {
      email: firstUser.email
    }

    const userIdStr = secondUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not a valid string');
    } 

    const response = await updateUser.execute(userIdStr, update);

    expect(response.isLeft()).toBeTruthy();
  });
})