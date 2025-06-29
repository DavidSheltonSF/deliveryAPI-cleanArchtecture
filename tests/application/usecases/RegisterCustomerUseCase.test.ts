import { MongodbCustomerRepository } from '../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { RegisterCustomerUseCase } from '../../../src/application/usecases/customer/RegisterCustomer/RegisterCustomerUseCase';
import { MockData } from '../../helpers/MockData';
import { Customer } from '../../../src/domain/entities/customer/Customer';
import { Email } from '../../../src/domain/entities/value-objects';

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

    const customerEntity = new Customer(customerProps);

    expect(mockRepository.add).toHaveBeenCalledWith(customerEntity);
    expect(mockRepository.findCustomerByEmail).toHaveBeenCalledWith(customerEntity.email.get());
  });

  test('Should not register a customer with duplicated email', async () => {
    const mockedExistingCustomer = MockData.mockCustomerModel();
    const mockRepository: jest.Mocked<MongodbCustomerRepository> = {
      findCustomerByEmail: jest.fn().mockResolvedValue(mockedExistingCustomer),
      add: jest.fn().mockResolvedValue(MockData.mockCustomerModel()),
    };
    const usecase = new RegisterCustomerUseCase(mockRepository);

    const duplicatedUserProps = await MockData.mockCustomerProps();
    duplicatedUserProps.email = Email.create(mockedExistingCustomer.email).getRight()

    const response = await usecase.execute(duplicatedUserProps);

    expect(response.isLeft()).toBeTruthy();
    expect(mockRepository.add).toHaveBeenCalledTimes(0);
  });
});
