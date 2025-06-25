import { MongodbCustomerRepository } from '../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { RegisterCustomerUseCase } from '../../../src/application/usecases/customer/RegisterCustomer/RegisterCustomerUseCase';
import { MockData } from '../../_helpers/mockData';
import { Customer } from '../../../src/domain/entities/customer/Customer';

describe('RegisterUserUseCase', () => {
  test('Should register a new customer', async () => {
    const mockRepository: jest.Mocked<MongodbCustomerRepository> = {
      findCustomerByEmail: jest
        .fn()
        .mockResolvedValue(MockData.mockCustomerModel()),
      add: jest.fn().mockResolvedValue(MockData.mockCustomerModel()),
    };

    const usecase = new RegisterCustomerUseCase(mockRepository);

    const customerProps = await MockData.mockCustomerProps();

    const response = await usecase.execute(customerProps);

    const customerEntity = new Customer(customerProps)

    expect(mockRepository.add).toHaveBeenCalledWith(customerEntity);
  })
});
