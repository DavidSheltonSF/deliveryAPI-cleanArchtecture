import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { UserRole } from '../_enums';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { CustomerUser } from './CustomerUser';

describe('Testing User entity', () => {
  const userDTO = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    role: UserRole.customer,
    birthday: new Date('2000-02-02'),
    address: {
      street: 'Rua Aurora',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '12584130',
    },
    authentication: {
      password: 'D$243142sfas',
    },
  };

  test('Should be a valid CustomerUser entity', async () => {
    const addressProps = {
      id: 'fdafdfaf',
      userId: 'fduaifdjfa',
      ...userDTO.address,
    };

    const hasher = new BcryptHasher(12);
    const password = 'fdanfksdia';
    const passwordHash = await hasher.hash(password);
    const authenticationProps = {
      id: 'fdafdfaf',
      userId: 'fduaifdjfa',
      passwordHash: passwordHash,
    };

    const address = new Address(addressProps);
    const authentication = new Authentication(authenticationProps, hasher);

    const customerProps = {
      id: 'fsafdafaf',
      ...userDTO,
      address,
      authentication,
    };

    const customer = new CustomerUser(customerProps);

    expect(customer.username).toBe(userDTO.username);
    expect(customer.name).toBe(userDTO.name);
    expect(customer.email).toBe(userDTO.email);
    expect(customer.cpf).toBe(userDTO.cpf);
    expect(customer.phone).toBe(userDTO.phone);
    expect(customer.role).toBe(userDTO.role);
    expect(customer.birthday).toBe(userDTO.birthday);
    expect(customer.passwordIsValid(password)).toBeTruthy();
  });
});
