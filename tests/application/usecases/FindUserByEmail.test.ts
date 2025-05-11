import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { FindUserByEmailUseCase } from '../../../src/application/usecases/user/find-user-by-email/FindUserByEmail';
import { MockData } from '../../_helpers/mockData';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findUserByEmailUseCase = new FindUserByEmailUseCase(spyUserRepository);

  return {
    findUserByEmailUseCase,
    spyUserRepository
  }
}

describe('Testing FindUserByEmailUseCase', () => {

  test('Should find a user by email correctly', async () => {
    const { findUserByEmailUseCase, spyUserRepository } = makeSut();

    const mockedUser = MockData.mockUser();

    const userEmailStr = mockedUser.email;

    if (!userEmailStr) {
      throw new Error('User EMAIL is not defined');
    }

    spyUserRepository.userDatabase.push(mockedUser);

    const foundUser = await findUserByEmailUseCase.execute(userEmailStr);

    if (!foundUser) {
      throw new Error('User not found');
    }

    expect(foundUser.username).toEqual(mockedUser.username);
    expect(foundUser.email).toEqual(mockedUser.email);
    expect(foundUser.authentication.password).toEqual(mockedUser.authentication.password);
    expect(foundUser.cpf).toEqual(mockedUser.cpf);
    expect(foundUser.phone).toEqual(mockedUser.phone);
    expect(foundUser.role).toEqual(mockedUser.role);
    expect(foundUser.address?.street).toEqual(mockedUser.address?.street);
    expect(foundUser.address?.city).toEqual(mockedUser.address?.city);
    expect(foundUser.address?.state).toEqual(mockedUser.address?.state);
    expect(foundUser.address?.zipCode).toEqual(mockedUser.address?.zipCode);
    
    // Check if the user email was inserted in the spy repository
    expect(spyUserRepository.findUserByEmailParams.email).toBe(userEmailStr);
  });

  test('Should find a user by email correctly', async () => {
    const { findUserByEmailUseCase, spyUserRepository } = makeSut();

    const mockedUser = MockData.mockUser();

    if (!mockedUser.email) {
      throw new Error('User EMAIL is not defined');
    }

    const foundUser = await findUserByEmailUseCase.execute(mockedUser.email);

    expect(foundUser).toBe(null);
    
    // Check if the user email was inserted in the spy repository
    expect(spyUserRepository.findUserByEmailParams.email).toBe(mockedUser.email);
  });

})