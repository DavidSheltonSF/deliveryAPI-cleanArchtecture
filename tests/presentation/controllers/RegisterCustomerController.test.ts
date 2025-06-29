import { MongodbCustomerRepository } from '../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { RegisterCustomerUseCase } from '../../../src/application/usecases/customer/RegisterCustomer/RegisterCustomerUseCase';
import {MockData} from "../../helpers/MockData"
import { Customer } from '../../../src/domain/entities/customer/Customer';
import { RegisterCustomerController } from '../../../src/presentation/controllers/customer/RegisterCustomerController';
import { CustomerDtoMapper } from '../../../src/presentation/mappers/CustomerDtoMapper';

describe('RegisterCustomerController', () => {
  test('Should register a new customer', async () => {
    const mockRepository: jest.Mocked<MongodbCustomerRepository> = {
      findCustomerByEmail: jest
        .fn()
        .mockResolvedValue(MockData.mockCustomerModel()),
      add: jest.fn().mockResolvedValue(MockData.mockCustomerModel()),
    };

    const usecase = new RegisterCustomerUseCase(mockRepository);

    const controller = new RegisterCustomerController(usecase);

    const request = {
      body: MockData.mockCustomerDto(),
    };

    const response = await controller.handle(request);

    expect(mockRepository.add).toHaveBeenCalled();
    expect(response.statusCode).toBe(201);
  });
});
