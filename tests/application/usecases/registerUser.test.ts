import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { RegisterUser } from '../../../src/application/usecases/register-user/registerUser';
import { MockData } from '../../_helpers/mockData';

describe('Testing RegisterUserUseCase', () => {

  test('Should register a new user', async () => {
    const spyUserRepository = new SpyUserRepository();
    const registerUserUseCase = new RegisterUser(spyUserRepository);

    const mockedUser = MockData.mockUser();

    await registerUserUseCase.register(mockedUser);

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
    const spyUserRepository = new SpyUserRepository();
    const registerUserUseCase = new RegisterUser(spyUserRepository);

    const mockedUser = MockData.mockUser();

    // Adding a user in the fake repository
    spyUserRepository.userDatabase.push(mockedUser);

    // Trying to register the same user again
    const registerError = await registerUserUseCase.register(mockedUser);

    expect(registerError.isLeft()).toBeTruthy();

  });
  
})