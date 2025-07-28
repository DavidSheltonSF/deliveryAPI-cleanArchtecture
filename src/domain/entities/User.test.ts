import { UserRole } from '../_enums';
import { Authentication } from './Authentication';
import { User } from './User';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';

describe('Testing User entity', () => {
  const userProps = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    birthday: new Date('2000-02-02'),
  };

  const authenticationProps = {
    passwordHash: '',
  };

  const hasher = new BcryptHasher(12);

  async function makeSutUser(
    password: string = 'Drejkakn$%!2',
    userRole: string = UserRole.admin
  ) {
    authenticationProps.passwordHash = await hasher.hash(password);
    const authentication = new Authentication(authenticationProps, hasher);
    const user = new User(userProps, userRole, authentication);
    return user;
  }

  test('Should be a valid User entity', async () => {
    const password = 'fdafsadfa';
    const userRole = UserRole.admin;
    const user = await makeSutUser(password, userRole);

    expect(user.username).toBe(userProps.username);
    expect(user.name).toBe(userProps.name);
    expect(user.email).toBe(userProps.email);
    expect(user.cpf).toBe(userProps.cpf);
    expect(user.phone).toBe(userProps.phone);
    expect(user.role).toBe(userRole);
    expect(user.birthday).toBe(userProps.birthday);
    expect(await user.passwordIsValid(password)).toBeTruthy();
    expect(user.createdAt).toBeTruthy()
  });

  test('Should set Id properly', async () => {
    const user = await makeSutUser();
    const userId = 'id0316151';
    const createdAt = new Date('2000-01-01');

    user.setId(userId);

    expect(user.id).toBe(userId);
  });

  test('Should return error when trying to set Id if is are alerady set', async () => {
    const user = await makeSutUser();
    const userId = 'id0316151';

    user.setId(userId);

    const idOrError = user.setId(userId);

    expect(idOrError.isLeft()).toBeTruthy();
  });
});
