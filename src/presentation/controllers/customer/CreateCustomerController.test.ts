import { CreateCustomerController } from './CreateCustomerController';
import { CreateCustomerUseCase } from '../../../application/usecases/customer/CreateCustomer/CreateCustomerUseCase';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { mockCustomerRepository } from '../../../tests/mocks/mockCustomerRepository';
import { mockAddressRepository } from '../../../tests/mocks/mockAddressRepository';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import { AddressMocker } from '../../../tests/mocks/AddressMocker';
import {customerFakeData, addressFakeDara} from '../../../tests/mocks/fakeDatabases'

describe('Testing CreateCustomerController', () => {
  
  async function makeSut() {
    const userDTO = UserMocker.mockUserDTO();
    const addressDTO = AddressMocker.mockAddressDTO();
    userDTO.address = addressDTO;

    const customerRepository = mockCustomerRepository(customerFakeData);
    const addressRepository = mockAddressRepository(addressFakeDara);
    const hasher = makeMockHasher();

    const useCase = new CreateCustomerUseCase(
      customerRepository,
      addressRepository,
      hasher
    );

    const createCustomerController = new CreateCustomerController(useCase);

    return {
      createCustomerController,
      useCase,
      customerRepository,
      addressRepository,
      hasher,
      userDTO
    };
  }

  test('should return created (201) if everything went well', async () => {
    const { createCustomerController, userDTO } = await makeSut();
    const httpRequest = {
      body: userDTO,
    };
    const response = await createCustomerController.handle(httpRequest);
    expect(response.statusCode).toBe(201)
  });

  
 test('should return bad request if no body is provided', async () => {
   const { createCustomerController, userDTO } = await makeSut();

   const httpRequest = {
   };

   const response = await createCustomerController.handle(httpRequest);

   expect(response.statusCode).toBe(400);
 });

  // test('should call CustomerRepository.findByEmail with the provided email', async () => {
  //   const { useCase, customerRepository } = await makeSut();

  //   await useCase.execute(createUserDTO);
  //   expect(customerRepository.findByEmail).toHaveBeenCalledWith(userDTO.email);
  // });

  // test('should call create method of all repositories', async () => {
  //   const {
  //     useCase,
  //     customerRepository,
  //     addressRepository,
  //   } = await makeSut();

  //   await useCase.execute(createUserDTO);

  //   expect(customerRepository.create).toHaveBeenCalled();
  //   expect(addressRepository.create).toHaveBeenCalled();
  // });

  // test('should return error when a duplicated email is found', async () => {
  //   const duplicatedEmail = 'jojo@email.com';

  //   const createCustomerData = {
  //     ...createUserDTO,
  //   };
  //   createCustomerData.user.email = duplicatedEmail;

  //   const {
  //     customerRepository,
  //     addressRepository,
  //     hasher,
  //   } = await makeSut();

  //   // Modify the return of .findByEmail this time
  //   (customerRepository.findByEmail as jest.Mock).mockResolvedValueOnce({
  //     email: Email.createFromPersistence(duplicatedEmail),
  //   });

  //   const useCase = new CreateCustomerUseCase(
  //     customerRepository,
  //     addressRepository,
  //     hasher
  //   );

  //   const responseOrError = await useCase.execute(createCustomerData);

  //   expect(responseOrError.isLeft()).toBeTruthy();
  // });
});
