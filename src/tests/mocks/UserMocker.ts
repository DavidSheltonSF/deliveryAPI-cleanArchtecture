import { faker } from '@faker-js/faker';
import { CustomerDTO } from '../../presentation/dtos/CustomerDTO';
import { UserRole } from '../../domain/_enums';
import { AddressMocker } from './AddressMocker';
import { CustomerResponseDTO } from '../../application/useCaseDtos/CustomerResponseDTO';

export class UserMocker {
  static mockCustomerDTO(): CustomerDTO {
    const customerDTO: CustomerDTO = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cpf: '14485874755',
      phone: '21547855887',
      birthday: '2000-01-02',
      role: faker.helpers.enumValue(UserRole),
      password: 'R$$osaini888dfa',
      address: AddressMocker.mockAddressDTO(),
    };

    return customerDTO;
  }

  static mockCustomerResponseDTO(): CustomerResponseDTO {
    const customerDTO: CustomerResponseDTO = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: '21547855887',
      birthday: '2000-01-02',
      role: faker.helpers.enumValue(UserRole),
      address: AddressMocker.mockAddressDTO()
    };

    return customerDTO;
  }
}
