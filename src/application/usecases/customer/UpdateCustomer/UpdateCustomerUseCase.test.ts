import { mockCustomerRepository } from '../../../../tests/mocks/mockCustomerRepository';
import { UserMocker } from '../../../../tests/mocks/UserMocker';
import { Cpf, Name } from '../../../../domain/value-objects';
import { UpdateCustomerUseCase } from './UpdateCustomerUseCase';

describe('Testing CreateCustomerUserCase', () => {
  async function makeSut() {
    const userData = UserMocker.mockUserDTO();
    const customerRepository = mockCustomerRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    return {
      userData,
      useCase,
      customerRepository,
    };
  }

  test('should return Right when valid data is provided', async () => {
    const { useCase } = await makeSut();

    const rawUpdateData = {
      firstName: 'Updated',
      cpf: '15585887877',
    };

    const responseOrError = await useCase.execute(
      'fakeID12323414',
      rawUpdateData
    );
    expect(responseOrError.isRight()).toBeTruthy();
  });

  test('should call CustomerRepository.update with id and data provided', async () => {
    const { useCase, customerRepository } = await makeSut();

    const rawUpdateData = {
      firstName: 'Mariel',
      cpf: '15585887877',
    };

    const updateData = {
      firstName: Name.createFromPersistence(rawUpdateData.firstName),
      cpf: Cpf.createFromPersistence(rawUpdateData.cpf),
    };
    const id = 'fakeID12323414';
    await useCase.execute(id, rawUpdateData);

    expect(customerRepository.update).toHaveBeenCalledWith(
      id,
      expect.objectContaining(updateData)
    );
  });


  test('should call CustomerRepository.findById with id provided', async () => {
    const { useCase, customerRepository } = await makeSut();

    const rawUpdateData = {
      firstName: 'Mariel',
      cpf: '15585887877',
    };

    const id = 'fakeID12323414';
    await useCase.execute(id, rawUpdateData);
    expect(customerRepository.findById).toHaveBeenCalledWith(id);
  });

  test('should return Left when invalid data is provided', async () => {
    const { useCase } = await makeSut();

    const rawUpdateData = {
      firstName: 'FSNDJK431551',
      cpf: '15585887877',
    };

    const responseOrError = await useCase.execute('fakeID14', rawUpdateData);
    expect(responseOrError.isLeft()).toBeTruthy();
  });
});
