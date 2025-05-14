import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { RegisterUserUseCase } from '../../../src/application/usecases/user/register-user/RegisterUserUseCase';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const registerUser = new RegisterUserUseCase(spyUserRepository);

  return {
    registerUser,
    spyUserRepository
  }
}

describe('Testing RegisterUserUseCase', () => {

  test('Should register a new user', async () => {
    const { spyUserRepository, registerUser } = makeSut();

    const mockedUser = MockData.mockUser();

    await registerUser.execute(mockedUser);

    expect(spyUserRepository.addParams.user?.username).toBe(mockedUser.username);
    expect(spyUserRepository.addParams.user?.email).toBe(mockedUser.email);
    expect(spyUserRepository.addParams.user?.cpf).toBe(mockedUser.cpf);
    expect(spyUserRepository.addParams.user?.phone).toBe(mockedUser.phone);
    expect(spyUserRepository.addParams.user?.role).toBe(mockedUser.role);
    expect(spyUserRepository.addParams.user?.address?.city).toBe(mockedUser.address?.city);
    expect(spyUserRepository.addParams.user?.address?.street).toBe(mockedUser.address?.street);
    expect(spyUserRepository.addParams.user?.address?.state).toBe(mockedUser.address?.state);
    expect(spyUserRepository.addParams.user?.address?.zipCode).toBe(mockedUser.address?.zipCode);
  });

  test('Should not register a duplicated user', async () => {
    const { spyUserRepository, registerUser } = makeSut();

    const mockedUser = MockData.mockUser();

    // Adding a user in the fake repository
    spyUserRepository.userDatabase.push(mockedUser);

    // Trying to register the same user again
    const registerError = await registerUser.execute(mockedUser);

    expect(registerError.isLeft()).toBeTruthy();

  });
  
})