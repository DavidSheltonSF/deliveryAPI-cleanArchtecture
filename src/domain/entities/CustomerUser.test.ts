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

  const hasher = new BcryptHasher(12);

  async function makeSutCustomer() {
    authenticationProps.passwordHash = await hasher.hash(password);
    const address = new Address(addressProps);
    const authentication = new Authentication(authenticationProps, hasher);
    const customer = new CustomerUser(userProps, address, authentication);
    return customer;
  }

  test('Should be a valid CustomerUser entity', async () => {
    const customer = await makeSutCustomer();

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

  test('Should update all fields in props', async () => {
    const customer = await makeSutCustomer();

    const updatedCustomerProps = {
      username: 'updatedNameeee',
      name: 'name-updated',
      email: 'updatedemail@bugmail.com',
      cpf: '14578525255',
      phone: '21555444741-updated',
      birthday: new Date('1999-01-01')
    };

    customer.updateProps(updatedCustomerProps);

    expect(customer.email).toBe(updatedCustomerProps.email);
    expect(customer.phone).toBe(updatedCustomerProps.phone);
  });

  test('Should update some fields in props', async () => {
    const customer = await makeSutCustomer();

    const updatedCustomerProps = {
      email: 'updatedemail@bugmail.com',
      phone: '21555444741-updated',
    };

    customer.updateProps(updatedCustomerProps);

    expect(customer.email).toBe(updatedCustomerProps.email);
    expect(customer.phone).toBe(updatedCustomerProps.phone);
  });

  test('Should update CustomerUser addresss', async () => {
    const customer = await makeSutCustomer();

    const updatedAddressData = {
      city: 'Updated City',
    };

    customer.updateAddress(updatedAddressData);

    expect(customer.address.city).toBe(updatedAddressData.city);
  });

  test('Should update CustomerUser password', async () => {
    const customer = await makeSutCustomer();

    const password = 'UpdatedPassword';
    const passwordHash = await hasher.hash(password);

    customer.updatePassword(passwordHash);

    expect(customer.passwordIsValid(password)).toBeTruthy();
  });
});
