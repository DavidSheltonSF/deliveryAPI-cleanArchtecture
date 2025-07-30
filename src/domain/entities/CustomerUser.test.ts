import { Role } from '../_enums';
import { Authentication } from './Authentication';
import { Address } from './Address';
import { CustomerUser } from './CustomerUser';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { RawAuthenticationProps } from './rawProps/RawAuthenticationProps';
import { RawAddressProps } from './rawProps/RawAddressProps';
import { RawUserProps } from './rawProps/RawUserProps';

describe('Testing Customer entity', () => {
  const userProps: RawUserProps = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    birthday: new Date('2000-02-02'),
  };

  const userRole = Role.customer;

  const addressProps: RawAddressProps = {
    street: 'Rua Teste',
    city: 'São Paulo',
    state: 'São Paulo',
    zipCode: '88444458',
  };

  const authenticationProps: RawAuthenticationProps = {
    password: 'D#434155fadfss',
    sessionToken: 'fakeSessionToken',
  };

  const hasher = new BcryptHasher(12);

  function makeValidAddress(props: RawAddressProps): Address {
    const authOrError = Address.create(props);
    return authOrError.getRight();
  }

  async function makeValidAuth(
    props: RawAuthenticationProps
  ): Promise<Authentication> {
    const authOrError = await Authentication.create(props, hasher);
    return authOrError.getRight();
  }

  async function makeValidCustomer(
    userProps: RawUserProps
  ): Promise<CustomerUser> {
    const address = makeValidAddress(addressProps);
    const authentication = await makeValidAuth(authenticationProps);
    const customerOrError = CustomerUser.create(
      userProps,
      userRole,
      address,
      authentication
    );

    const customer = customerOrError.getRight();

    return customer;
  }

  test('Should be a valid Customer entity', async () => {
    const customer = await makeValidCustomer(userProps);

    expect(customer.username).toBe(userProps.username);
    expect(customer.name).toBe(userProps.name);
    expect(customer.email).toBe(userProps.email);
    expect(customer.cpf).toBe(userProps.cpf);
    expect(customer.phone).toBe(userProps.phone);
    expect(customer.role).toBe(userRole);
    expect(customer.birthday).toBe(userProps.birthday);
    expect(
      await customer.passwordIsValid(authenticationProps.password)
    ).toBeTruthy();
  });
});
