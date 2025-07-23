import { UserRole } from '../_enums';
import { Authentication } from './Authentication';
import { AdminUser } from './AdminUser';

describe('Testing User entity', () => {
  const user = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    role: UserRole.admin,
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

    const adminEntity = new AdminUser(
      user.username,
      user.name,
      user.email,
      user.cpf,
      user.phone,
      user.role,
      user.birthday,
      authenticationEntity
    );

    expect(adminEntity.username).toBe(user.username);
    expect(adminEntity.name).toBe(user.name);
    expect(adminEntity.email).toBe(user.email);
    expect(adminEntity.cpf).toBe(user.cpf);
    expect(adminEntity.phone).toBe(user.phone);
    expect(adminEntity.role).toBe(user.role);
    expect(adminEntity.birthday).toBe(user.birthday);
    expect(adminEntity.passwordHash).toBe(user.authentication.password);
  });
});
