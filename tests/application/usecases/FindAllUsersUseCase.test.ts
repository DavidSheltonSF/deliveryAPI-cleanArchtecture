import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { FindAllUsersUseCase } from '../../../src/application/usecases/user/find-all-users/FindAllUsersUseCase';
import { MockData } from '../../_helpers/mockData';
import { UserProps } from '../../../src/domain/entities/user-props';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findAllUsersUseCase = new FindAllUsersUseCase(spyUserRepository);

  return {
    findAllUsersUseCase,
    spyUserRepository
  }
}

describe('Testing FindAllUsersUseCase', () => {

  test('Should find all users', async () => {
    const { findAllUsersUseCase, spyUserRepository } = makeSut();

    const mockedUsers = MockData.mockUser(5);

    spyUserRepository.userDatabase = mockedUsers;

    const response = await findAllUsersUseCase.execute();

    expect(response).toEqual(mockedUsers);
  });

})