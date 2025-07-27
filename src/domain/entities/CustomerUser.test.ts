import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { UserRole } from '../_enums';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { CustomerUser } from './CustomerUser';

describe('Testing User entity', () => {
  const userProps = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    role: UserRole.customer,
    birthday: new Date('2000-02-02'),
  };

  const addressProps = {
    userId: 'nsanfkdnfka',
    street: 'Rua Aurora',
    city: 'Belford Roxo',
    state: 'Rio de Janeiro',
    zipCode: '12584130',
  };

  const password = 'fdmakfdnfkamfd';
  const authenticationProps = {
    passwordHash: '',
  };

  test('Should be a valid CustomerUser entity', async () => {
    const hasher = new BcryptHasher(12);
    authenticationProps.passwordHash = await hasher.hash(password);

    const address = new Address(addressProps);
    const authentication = new Authentication(authenticationProps, hasher);

    const customer = new CustomerUser(userProps, address, authentication);

    expect(customer.username).toBe(userProps.username);
    expect(customer.name).toBe(userProps.name);
    expect(customer.email).toBe(userProps.email);
    expect(customer.cpf).toBe(userProps.cpf);
    expect(customer.phone).toBe(userProps.phone);
    expect(customer.role).toBe(userProps.role);
    expect(customer.birthday).toBe(userProps.birthday);
    expect(customer.address.street).toBe(addressProps.street);
    expect(customer.address.city).toBe(addressProps.city);
    expect(customer.address.state).toBe(addressProps.state);
    expect(customer.address.zipCode).toBe(addressProps.zipCode);
    expect(customer.passwordIsValid(password)).toBeTruthy();
  });
});
