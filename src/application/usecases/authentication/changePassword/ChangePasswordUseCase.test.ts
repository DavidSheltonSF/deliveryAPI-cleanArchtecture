import { makeMockHasher } from '../../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../../tests/mocks/mockCustomerRepository';
import { makeMockTokenService } from '../../../../tests/mocks/mockTokenService';
import { UserMocker } from '../../../../tests/mocks/UserMocker';
import { ChangePasswordUseCase } from './ChangePasswordUseCase';
import { Email, Password } from '../../../../domain/value-objects';
import {
  customerFakeData,
} from '../../../../tests/mocks/fakeDatabases';

describe('Testing RequestPasswordChangeUseCase', () => {
  async function makeSut() {
    const userData = UserMocker.mockUserDTO();
    const customerRepository = mockCustomerRepository(customerFakeData);
    const tokenService = makeMockTokenService();
    const hashService = makeMockHasher();
    const useCase = new ChangePasswordUseCase(
      customerRepository,
      tokenService,
      hashService
    );
    return {
      useCase,
      customerRepository,
      tokenService,
      userData,
    };
  }

  test('should return right value if all data provided is valid', async () => {
    const { useCase, customerRepository, tokenService, userData } =
      await makeSut();

    const fakeEmail = userData.email;
    const fakeToken = tokenService.sign({ email: fakeEmail });
    const newPasssword = 'mfaf$#%51d3614252DDAGFfgsg';

    (customerRepository.findByEmail as jest.Mock).mockImplementationOnce(
      jest.fn((email) => {
        return {
          email: Email.createFromPersistence(fakeEmail),
          passwordHash: Password.createFromPersistence(userData.password),
        };
      })
    );
    const responseOrError = await useCase.execute(fakeToken, newPasssword);
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should return left if the user is not found', async () => {
    const { useCase, userData, tokenService } = await makeSut();
    const fakeEmail = userData.email;
    const fakeToken = tokenService.sign({ email: fakeEmail });
    const newPasssword = 'mfaf$#%51d3614252DDAGFfgsg';
    const responseOrError = await useCase.execute(fakeToken, newPasssword);
    expect(responseOrError.isLeft()).toBeTruthy();
  });
});
