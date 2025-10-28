import { faker } from '@faker-js/faker';
import { CustomerDTO } from '../../presentation/dtos/CustomerDTO';
import { UserRole } from '../../domain/_enums';
import { AddressMocker } from './AddressMocker';
import { CustomerResponseDTO } from '../../application/useCaseDtos/CustomerResponseDTO';
import { WithId } from '../../utils/types/WithId';
import { CustomerProps } from '../../domain/entities/props/CustomerProps';
import { Birthday, Cpf, Phone } from '../../domain/value-objects';

export class CustomerMocker {
  static mockCustomerDTO(): CustomerDTO {
    const customerDTO: CustomerDTO = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cpf: '14485874755',
      phone: '21547855887',
      birthday: '2000-01-02',
      password: 'R$$osaini888dfa',
      address: AddressMocker.mockAddressDTO(),
    };

    return customerDTO;
  }

  static mockCustomerResponseDTO(): WithId<CustomerResponseDTO> {
    const customerDTO: WithId<CustomerResponseDTO> = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: '21547855887',
      birthday: '2000-01-02',
      role: faker.helpers.enumValue(UserRole),
      address: AddressMocker.mockAddressDTO(),
      createdAt: '20020-01-02',
    };

    return customerDTO;
  }

  static mockCustomerProps(): CustomerProps {
    const customerProps = {
      userId: faker.string.uuid(),
      cpf: Cpf.createFromPersistence('52144858745'),
      phone: Phone.createFromPersistence('21965855574'),
      birthday: Birthday.createFromPersistence(new Date()),
    };

    return customerProps;
  }

  static mockCustomerPropsWithId(): WithId<CustomerProps> {
    const customerProps = {
      id: 'mfakdsnfasnkfjdnskfma-fake',
      userId: faker.string.uuid(),
      cpf: Cpf.createFromPersistence('52144858745'),
      phone: Phone.createFromPersistence('21965855574'),
      birthday: Birthday.createFromPersistence(new Date()),
    };

    return customerProps;
  }
}
