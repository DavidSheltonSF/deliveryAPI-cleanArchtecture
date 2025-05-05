import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { FindAllUsers } from '../../../src/application/usecases/find-all-users/FindAllUses';
import { MockData } from '../../_helpers/mockData';
import { UserProps } from '../../../src/domain/entities/user-props';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findAllUsersUseCase = new FindAllUsers(spyUserRepository);

  return {
    findAllUsersUseCase,
    spyUserRepository
  }
}

describe('Testing FindAllUsersUseCase', () => {

  test('Should find all users', async () => {
    const { findAllUsersUseCase, spyUserRepository } = makeSut();

    const mockedUsers: UserProps[] = []
    
    for (let i = 0; i < 5; i++) {
      // Adding the user in the fake dadabase manualy
      mockedUsers.push(MockData.mockUser());
    }

    spyUserRepository.userDatabase = mockedUsers;

    const response = await findAllUsersUseCase.execute();

    expect(response).toEqual(mockedUsers);
  });

})