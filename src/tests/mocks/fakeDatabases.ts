import {
  AddressZipCode,
  Birthday,
  Cpf,
  Email,
  Name,
  Password,
  Phone,
} from '../../domain/value-objects';
import { CustomerProps } from '../../domain/entities/props/CustomerProps';
import { UserRole } from '../../domain/_enums';
import { WithId } from '../../utils/types/WithId';
import { AddressProps } from '../../domain/entities/props/AddressProps';

export const customerFakeData: WithId<CustomerProps>[] = [
  {
    id: 'mfakdsnfasnkfjdnskfma-fake',
    firstName: Name.createFromPersistence('CustomerTest'),
    lastName: Name.createFromPersistence('CustomerTest'),
    email: Email.createFromPersistence('customer@email.com'),
    cpf: Cpf.createFromPersistence('52144858745'),
    phone: Phone.createFromPersistence('21965855574'),
    role: UserRole.customer,
    birthday: Birthday.createFromPersistence(new Date()),
    passwordHash: Password.createFromPersistence('fakeHas4$$%@$2hemkqmrkq'),
    address: {
      street: 'Rua Teste',
      city: 'São Paulo',
      state: 'São Paulo',
      zipCode: AddressZipCode.createFromPersistence('21145587'),
    },
  },
];

export const addressFakeDara: WithId<AddressProps>[] = [
  {
    id: 'fefasfdasfasdfad',
    userId: 'sfsdafasdmflsaflasf',
    street: 'Rua Teste',
    city: 'São Paulo',
    state: 'São Paulo',
    zipCode: AddressZipCode.createFromPersistence('21145587'),
  },
];
