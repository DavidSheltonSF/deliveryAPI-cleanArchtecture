import { UserRole } from '../_enums';
import { Authentication } from './Authentication';
import { User } from './User';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';

describe('Testing User entity', () => {
  const hasher = new BcryptHasher(12);

  test('Should be a valid User entity', async () => {
    const userDTO = {
      id: 'dafdfddfa',
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
    const passwordHash = await hasher.hash(userDTO.authentication.password);
    const authenticationProps = {
      id: 'fdsfasfafdf',
      userId: 'dfajfdnaknfda',
      passwordHash,
    };
    const authentication = new Authentication(authenticationProps);

    const userProps = {
      ...userDTO,
      authentication,
    };

    const user = new User(userProps);

    expect(user.username).toBe(userDTO.username);
    expect(user.name).toBe(userDTO.name);
    expect(user.email).toBe(userDTO.email);
    expect(user.cpf).toBe(userDTO.cpf);
    expect(user.phone).toBe(userDTO.phone);
    expect(user.role).toBe(userDTO.role);
    expect(user.birthday).toBe(userDTO.birthday);
    expect(user).toBe(userDTO.authentication.password);
  });
});
