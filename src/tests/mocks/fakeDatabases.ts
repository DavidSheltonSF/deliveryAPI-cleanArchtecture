import {
  AddressZipCode,
  Birthday,
  Cpf,
  Email,
  Name,
  Password,
  Phone,
} from '../../domain/value-objects';
import { UserProps } from '../../domain/entities/props/UserProps';
import { UserRole } from '../../domain/_enums';
import { WithId } from '../../utils/types/WithId';
import { AddressProps } from '../../domain/entities/props/AddressProps';

export const customerFakeData: WithId<UserProps>[] = [
  {
    id: 'mfakdsnfasnkfjdnskfma-fake',
    firstName: Name.createFromPersistence('CustomerTest'),
    lastName: Name.createFromPersistence('CustomerTest'),
    email: Email.createFromPersistence('customer@email.com'),
    cpf: Cpf.createFromPersistence('52144858745'),
    phone: Phone.createFromPersistence('21965855574'),
    role: UserRole.admin,
    birthday: Birthday.createFromPersistence(new Date()),
    passwordHash: Password.createFromPersistence('fakeHas4$$%@$2hemkqmrkq'),
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
