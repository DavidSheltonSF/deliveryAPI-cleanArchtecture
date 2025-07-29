import { Role } from '../_enums';
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

  test('Should return right either value if valid values were provided', async () => {
    const role = Role.admin;
    const password = 'd#FFFR341j15415551';
    authenticationProps.passwordHash = await hasher.hash(password);
    const authentication = new Authentication(authenticationProps, hasher);
    const userOrError = User.create(userProps, role, authentication);

    expect(userOrError.isRight()).toBeTruthy();
  });

  test('Should be a valid User entity', async () => {
    const role = Role.admin;
    const password = 'd#FFFR341j15415551';
    authenticationProps.passwordHash = await hasher.hash(password);
    const authentication = new Authentication(authenticationProps, hasher);

    const userOrError = User.create(userProps, role, authentication);
    const user = userOrError.getRight();

    expect(user.username).toBe(userProps.username);
    expect(user.name).toBe(userProps.name);
    expect(user.email).toBe(userProps.email);
    expect(user.cpf).toBe(userProps.cpf);
    expect(user.phone).toBe(userProps.phone);
    expect(user.role).toBe(role);
    expect(user.birthday).toBe(userProps.birthday);
    expect(await user.passwordIsValid(password)).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
  });
});
