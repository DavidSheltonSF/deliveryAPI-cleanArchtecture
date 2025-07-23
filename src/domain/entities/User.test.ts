import { UserRole } from '../_enums';
import { Authentication } from './Authentication';
import { User } from './User';

describe('Testing User entity', () => {
  const user = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    role: UserRole.customer,
    birthday: new Date('2000-02-02'),
    authentication: {
      password: 'D$243142sfas',
    },
  };

  test('Should be a valid User entity', () => {
    const authenticationEntity = new Authentication(
      user.email,
      user.authentication.password
    );

    const userEntity = new User(
      user.username,
      user.name,
      user.email,
      user.cpf,
      user.phone,
      user.role,
      user.birthday,
      authenticationEntity
    );

    expect(userEntity.username).toBe(user.username);
    expect(userEntity.name).toBe(user.name);
    expect(userEntity.email).toBe(user.email);
    expect(userEntity.cpf).toBe(user.cpf);
    expect(userEntity.phone).toBe(user.phone);
    expect(userEntity.role).toBe(user.role);
    expect(userEntity.birthday).toBe(user.birthday);
    expect(userEntity.passwordHash).toBe(user.authentication.password);
  });
});
