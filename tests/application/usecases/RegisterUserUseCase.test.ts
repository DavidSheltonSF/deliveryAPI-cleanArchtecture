import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { RegisterUserUseCase } from '../../../src/application/usecases/user/register-user/RegisterUserUseCase';
import { MockData } from '../../_helpers/mockData';

const makeSut = () => {
  const spyUserRepository = new SpyUserRepository();
  const registerUser = new RegisterUserUseCase(spyUserRepository);

  return {
    registerUser,
    spyUserRepository,
  };
};

describe('Testing RegisterUserUseCase', () => {
  test('Should register a new user', async () => {
    const { spyUserRepository, registerUser } = makeSut();

    const [mockedUser] = MockData.mockCustomerDTO();

    await registerUser.execute(mockedUser);

    expect(spyUserRepository.addParams.newUser?.username).toBe(
      mockedUser.username
    );
    expect(spyUserRepository.addParams.newUser?.email).toBe(mockedUser.email);
    expect(spyUserRepository.addParams.newUser?.cpf).toBe(mockedUser.cpf);
    expect(spyUserRepository.addParams.newUser?.phone).toBe(mockedUser.phone);
    expect(spyUserRepository.addParams.newUser?.role).toBe(mockedUser.role);
    expect(spyUserRepository.addParams.newUser?.address?.city).toBe(
      mockedUser.address?.city
    );
    expect(spyUserRepository.addParams.newUser?.address?.street).toBe(
      mockedUser.address?.street
    );
    expect(spyUserRepository.addParams.newUser?.address?.state).toBe(
      mockedUser.address?.state
    );
    expect(spyUserRepository.addParams.newUser?.address?.zipCode).toBe(
      mockedUser.address?.zipCode
    );
  });

  test('Should not register a duplicated user', async () => {
    const { spyUserRepository, registerUser } = makeSut();

    const [mockedUser] = MockData.mockCustomerDTO();
    // Adding a user in the fake repository
    spyUserRepository.userDatabase.push(mockedUser);

    // Trying to register the same user again
    const registerError = await registerUser.execute(mockedUser);

    expect(registerError.isLeft()).toBeTruthy();
  });
});
