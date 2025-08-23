import { RequestPasswordChangeUseCase } from './RequestPasswordChangeUseCase';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import { mockCustomerRepository } from '../../../tests/mocks/mockCustomerRepository';
import { makeMockEmailGateway } from '../../../tests/mocks/mockEmailGateway';
import { makeMockTokenService } from '../../../tests/mocks/mockTokenService';
import { Email } from '../../../domain/value-objects';

describe('Testing RequestPasswordChangeUseCase', () => {
  const userDTO = UserMocker.mockUserDTO();

  async function makeSut() {
    const customerRepository = mockCustomerRepository();
    const emailGateway = makeMockEmailGateway();
    const tokenService = makeMockTokenService();
    const resetPasswordLinkConfig = {
      baseUrl: 'https:fakebaseUrl:',
      port: 400,
    };
    const useCase = new RequestPasswordChangeUseCase(
      customerRepository,
      emailGateway,
      tokenService,
      resetPasswordLinkConfig
    );

    return {
      useCase,
      customerRepository,
      emailGateway,
      tokenService,
    };
  }

  test('should return right value if all data provided is valid', async () => {
    const { useCase, customerRepository } = await makeSut();
    const fakeEmail = 'mockemail@email.com';
    (customerRepository.findByEmail as jest.Mock).mockImplementationOnce(
      jest.fn((email) => {
        return { email: Email.createFromPersistence(email) };
      })
    );
    const responseOrError = await useCase.execute(fakeEmail);
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should return left if the user is not found', async () => {
    const { useCase } = await makeSut();
    const fakeEmail = 'mockemail@email.com';
    const responseOrError = await useCase.execute(fakeEmail);
    expect(responseOrError.isLeft()).toBeTruthy();
  });
});
