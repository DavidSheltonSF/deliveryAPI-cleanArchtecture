import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { FindUserById } from '../../../src/application/usecases/find-user-by-id/FindUserById';
import { MockData } from '../../_helpers/mockData';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findUserByIdUseCase = new FindUserById(spyUserRepository);

  return {
    findUserByIdUseCase,
    spyUserRepository
  }
}

describe('Testing FindUserByIdUseCase', () => {

  test('Should find a user by id correctly', async () => {
    const { findUserByIdUseCase, spyUserRepository } = makeSut();

    const mockedUser = MockData.mockUser();

    const userIdStr = mockedUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not defined');
    }

    spyUserRepository.userDatabase.push(mockedUser);

    const foundUser = await findUserByIdUseCase.execute(userIdStr);

    if (!foundUser) {
      throw new Error('User not found');
    }

    expect(foundUser.cpf).toEqual(mockedUser.cpf);
    expect(foundUser.phone).toEqual(mockedUser.phone);
    expect(foundUser.role).toEqual(mockedUser.role);
    expect(foundUser.address?.street).toEqual(mockedUser.address?.street);
    expect(foundUser.address?.city).toEqual(mockedUser.address?.city);
    expect(foundUser.address?.state).toEqual(mockedUser.address?.state);
    expect(foundUser.address?.zipCode).toEqual(mockedUser.address?.zipCode);
    
    // Check if the user id was inserted in the spy repository
    expect(spyUserRepository.findUserByIdParams.id).toBe(userIdStr);
  });

  test('Should return null if user was not found', async () => {
    const { findUserByIdUseCase, spyUserRepository } = makeSut();

    const mockedUser = MockData.mockUser();

    const userIdStr = mockedUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not defined');
    }

    const foundUser = await findUserByIdUseCase.execute(userIdStr);

    expect(foundUser).toBe(null);

    // Check if the user id was inserted in the spy repository
    expect(spyUserRepository.findUserByIdParams.id).toBe(userIdStr);
  });
})