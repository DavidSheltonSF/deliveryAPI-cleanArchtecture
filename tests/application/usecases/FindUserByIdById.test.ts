import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { FindUserByIdUseCase } from '../../../src/application/usecases/user/find-user-by-id/FindUserByIdUseCase';
import { MockData } from '../../_helpers/mockData';


const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const findUserByIdUseCaseUseCase = new FindUserByIdUseCase(spyUserRepository);

  return {
    findUserByIdUseCaseUseCase,
    spyUserRepository
  }
}

describe('Testing FindUserByIdUseCaseUseCase', () => {

  test('Should find a user by id correctly', async () => {
    const { findUserByIdUseCaseUseCase, spyUserRepository } = makeSut();

    const [mockedUser] = MockData.mockUser();

    const userIdStr = mockedUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not defined');
    }

    spyUserRepository.userDatabase.push(mockedUser);

    const foundUser = await findUserByIdUseCaseUseCase.execute(userIdStr);

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
    const { findUserByIdUseCaseUseCase, spyUserRepository } = makeSut();

    const [mockedUser] = MockData.mockUser();

    const userIdStr = mockedUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not defined');
    }

    const foundUser = await findUserByIdUseCaseUseCase.execute(userIdStr);

    expect(foundUser).toBe(null);

    // Check if the user id was inserted in the spy repository
    expect(spyUserRepository.findUserByIdParams.id).toBe(userIdStr);
  });
})