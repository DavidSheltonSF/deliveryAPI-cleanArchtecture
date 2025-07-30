import { Role } from '../_enums';
import { Authentication } from './Authentication';
import { User } from './User';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { RawAuthenticationProps } from './rawProps/RawAuthenticationProps';
import { RawUserProps } from './rawProps/RawUserProps';
import { buildUserProps } from '../helpers/buildUserProps';

describe('Testing User entity', () => {
  const rawUserProps = {
    username: 'Jorel33',
    name: 'Jorel',
    email: 'jo@bugmail.com',
    cpf: '14555774778',
    phone: '21554744555',
    birthday: new Date('2000-02-02'),
  };

  const role = Role.admin;

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

  async function makeValidUser(props: RawUserProps): Promise<User> {
    const role = Role.admin;
    const propsOrError = buildUserProps(props);
    const validProps = propsOrError.getRight();
    const authentication = await makeValidAuth(authenticationProps);
    return new User(validProps, role, authentication);
  }

  test('should be a valid User entity', async () => {
    const user = await makeValidUser(rawUserProps);

    expect(user.username).toBe(rawUserProps.username);
    expect(user.name).toBe(rawUserProps.name);
    expect(user.email).toBe(rawUserProps.email);
    expect(user.cpf).toBe(rawUserProps.cpf);
    expect(user.phone).toBe(rawUserProps.phone);
    expect(user.role).toBe(role);
    expect(user.birthday).toBe(rawUserProps.birthday);
    expect(
      await user.passwordIsValid(authenticationProps.password)
    ).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
  });

  test('should get User props properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const props = user.props;

    expect(props.username).toBe(rawUserProps.username);
    expect(props.name).toBe(rawUserProps.name);
    expect(props.email).toBe(rawUserProps.email);
    expect(props.cpf).toBe(rawUserProps.cpf);
    expect(props.phone).toBe(rawUserProps.phone);
    expect(props.birthday).toBe(rawUserProps.birthday);
  });

  test('should update Username properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const updatdUsername = 'Frederico';
    user.updateUserName(updatdUsername);

    expect(user.username).toBe(updatdUsername);
  });

  test('should update name properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const name = 'Frederico Joares';
    user.updateName(name);

    expect(user.name).toBe(name);
  });

  test('should update email properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const email = 'fred@email.com';
    user.updateEmail(email);

    expect(user.email).toBe(email);
  });

  test('should update cpf properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const cpf = '15488587458';
    user.updateCpf(cpf);

    expect(user.cpf).toBe(cpf);
  });

  test('should update phone properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const phone = '21858474555';
    user.updatePhone(phone);

    expect(user.phone).toBe(phone);
  });

  test('should update birthday properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const birthday = new Date('2000-02-02');
    user.updateBirthday(birthday);
    expect(user.birthday).toBe(birthday);
  });

  test('should return either right value if valid password is provided', async () => {
    const user = await makeValidUser(rawUserProps);
    const newPassword = 'NewPassword#2025';
    const passwordOrError = await user.updatePassword(newPassword);
    console.log(passwordOrError)
    expect(passwordOrError.isRight()).toBeTruthy();
  });

  test('should update password properly', async () => {
    const user = await makeValidUser(rawUserProps);
    const newPassword = 'NewPassword#2025';
    await user.updatePassword(newPassword);

    expect(user.passwordIsValid(authenticationProps.password)).toBeTruthy();
  });

  test('should return an error and not update if username is invalid', async () => {
    const user = await makeValidUser(rawUserProps);
    const username = '@';
    const updateResult = user.updateUserName(username);

    expect(updateResult.isLeft()).toBeTruthy();
    expect(user.username).toBe(rawUserProps.username);
  });

  test('should return an error and not update if name is invalid', async () => {
    const user = await makeValidUser(rawUserProps);
    const name = 'David123';
    const updateResult = user.updateName(name);

    expect(updateResult.isLeft()).toBeTruthy();
    expect(user.name).toBe(rawUserProps.name);
  });

  test('should return an error and not update if email is invalid', async () => {
    const user = await makeValidUser(rawUserProps);
    const email = 'David123';
    const updateResult = user.updateEmail(email);

    expect(updateResult.isLeft()).toBeTruthy();
    expect(user.email).toBe(rawUserProps.email);
  });

  test('should return an error and not update if cpf is invalid', async () => {
    const user = await makeValidUser(rawUserProps);
    const cpf = 'CpfINvalido';
    const updateResult = user.updateCpf(cpf);

    expect(updateResult.isLeft()).toBeTruthy();
    expect(user.cpf).toBe(rawUserProps.cpf);
  });

  test('should return an error and not update if phone is invalid', async () => {
    const user = await makeValidUser(rawUserProps);
    const phone = 'phone6555';
    const updateResult = user.updatePhone(phone);

    expect(updateResult.isLeft()).toBeTruthy();
    expect(user.phone).toBe(rawUserProps.phone);
  });

  test('should return an error and not update if birthday is invalid', async () => {
    const user = await makeValidUser(rawUserProps);
    const birthday = new Date('5281515');
    const updateResult = user.updateBirthday(birthday);

    expect(updateResult.isLeft()).toBeTruthy();
    expect(user.birthday).toBe(rawUserProps.birthday);
  });
});
