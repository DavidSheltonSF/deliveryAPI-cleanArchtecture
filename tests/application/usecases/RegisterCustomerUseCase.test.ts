import { MongodbCustomerRepository } from '../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { RegisterCustomerUseCase } from '../../../src/application/usecases/customer/RegisterCustomer/RegisterCustomerUseCase';
import { MockData } from '../../_helpers/mockData';

describe('RegisterUserUseCase', () => {
  test('Should register a new customer', async () => {
    const mockRepository: jest.Mocked<MongodbCustomerRepository> = {
      findCustomerByEmail: jest
        .fn()
        .mockResolvedValue(MockData.mockCustomerModel()),
      add: jest.fn().mockResolvedValue(MockData.mockCustomerModel()),
    };

    const usecase = new RegisterCustomerUseCase(mockRepository);

    const [customerProps] = await MockData.mockCustomerProps();

    const response = await usecase.execute(customerProps);

    console.log(response)

    expect(mockRepository.add).toHaveBeenCalled();
  })
});
