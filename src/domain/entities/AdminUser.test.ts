import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { UserRole } from '../_enums';
import { Address } from './Address';
import { Authentication } from './Authentication';
import { AdminUser } from './AdminUser';

describe('Testing User entity', () => {
  const userProps = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    role: UserRole.admin,
    birthday: new Date('2000-02-02'),
  };

  const password = 'afdsfsdfaf'
  const authenticationProps = {
    id: 'dsfsdfa',
    userID: 'FMDSKFNASKFA',
    passwordHash: '',
  }

  test('Should be a valid AdminUser entity', async () => {

    const hasher = new BcryptHasher(12);
    authenticationProps.passwordHash = await hasher.hash(password);

    const authentication = new Authentication(authenticationProps, hasher);

    const admin = new AdminUser(userProps, authentication);

    expect(admin.username).toBe(userProps.username);
    expect(admin.name).toBe(userProps.name);
    expect(admin.email).toBe(userProps.email);
    expect(admin.cpf).toBe(userProps.cpf);
    expect(admin.phone).toBe(userProps.phone);
    expect(admin.role).toBe(userProps.role);
    expect(admin.birthday).toBe(userProps.birthday);
    expect(admin.passwordIsValid(password)).toBeTruthy();
  });
});
