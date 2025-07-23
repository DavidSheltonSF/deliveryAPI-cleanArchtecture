import { UserRole } from '../_enums';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { CustomerUser } from './CustomerUser';

describe('Testing User entity', () => {
  const user = {
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

  test('Should be a valid User entity', () => {
    const addressEntity = new Address(
      user.address.street,
      user.address.city,
      user.address.state,
      user.address.zipCode
    );

    const authenticationEntity = new Authentication(
      user.email,
      user.authentication.password
    );

    const customerEntity = new CustomerUser(
      user.username,
      user.name,
      user.email,
      user.cpf,
      user.phone,
      user.role,
      user.birthday,
      addressEntity,
      authenticationEntity
    );

    expect(customerEntity.username).toBe(user.username);
    expect(customerEntity.name).toBe(user.name);
    expect(customerEntity.email).toBe(user.email);
    expect(customerEntity.cpf).toBe(user.cpf);
    expect(customerEntity.phone).toBe(user.phone);
    expect(customerEntity.role).toBe(user.role);
    expect(customerEntity.birthday).toBe(user.birthday);
    expect(customerEntity.passwordHash).toBe(user.authentication.password);
  });
});
