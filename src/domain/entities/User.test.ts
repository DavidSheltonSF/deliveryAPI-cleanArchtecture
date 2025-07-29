import { Role } from '../_enums';
import { Authentication } from './Authentication';
import { User } from './User';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { RawAuthenticationProps } from './rawProps/RawAuthenticationProps';
import { RawUserProps } from './rawProps/RawUserProps';

describe('Testing User entity', () => {
  const userProps: RawUserProps = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    birthday: new Date('2000-02-02'),
  };

  const authenticationProps: RawAuthenticationProps = {
    password: '4D21t6&&fsafdd',
    sessionToken: 'iua8hiafn',
  };

  const hasher = new BcryptHasher(12);

  async function makeValidAuth(
    props: RawAuthenticationProps
  ): Promise<Authentication> {
    const authOrError = await Authentication.create(props, hasher);
    return authOrError.getRight();
  }

  test('should return right either value if valid values were provided', async () => {
    const role = Role.admin;
    const authentication = await makeValidAuth(authenticationProps);
    const userOrError = User.create(userProps, role, authentication);

    expect(userOrError.isRight()).toBeTruthy();
  });

  test('should be a valid User entity', async () => {
    const role = Role.admin;
    const authentication = await makeValidAuth(authenticationProps);

    const userOrError = User.create(userProps, role, authentication);
    const user = userOrError.getRight();

    expect(user.username).toBe(userProps.username);
    expect(user.name).toBe(userProps.name);
    expect(user.email).toBe(userProps.email);
    expect(user.cpf).toBe(userProps.cpf);
    expect(user.phone).toBe(userProps.phone);
    expect(user.role).toBe(role);
    expect(user.birthday).toBe(userProps.birthday);
    expect(
      await user.passwordIsValid(authenticationProps.password)
    ).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
  });

  test('should get User props properly', async () => {
    const role = Role.admin;
    const authentication = await makeValidAuth(authenticationProps);

    const userOrError = User.create(userProps, role, authentication);
    const user = userOrError.getRight();

    const props = user.props;

    expect(props.username).toBe(userProps.username);
    expect(props.name).toBe(userProps.name);
    expect(props.email).toBe(userProps.email);
    expect(props.cpf).toBe(userProps.cpf);
    expect(props.phone).toBe(userProps.phone);
    expect(props.birthday).toBe(userProps.birthday);
  });

  test('should update Username properly', async () => {
    const role = Role.admin;
    const authentication = await makeValidAuth(authenticationProps);
    const userOrError = User.create(userProps, role, authentication);
    const user = userOrError.getRight();
    const updatdUsername = 'Frederico';
    user.updateUserName(updatdUsername);

    expect(user.username).toBe(updatdUsername);
  });
});
