import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../src/domain/entities/user/User';
import {
  Cpf,
  Email,
  Name,
  Password,
  PasswordHash,
  Role,
  UserName,
} from '../../../src/domain/value-objects';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';
import { Authentication } from '../../../src/domain/entities/authentication/Authentication';

describe('User Model', () => {
  async function makeSut() {
    const id = uuidv4();
    const username = UserName.create('Carlos').getRight();
    const name = Name.create('Carlos Montenegro').getRight();
    const email = Email.create('carlos@bugmail.com').getRight();
    const cpf = Cpf.create('12588774825').getRight();
    const role = Role.create('admin').getRight();

    // Creating hash password
    const hasher = new BcryptHasher(12);
    const password = Password.create('Dae84*jifsjf21').getRight();
    const passwordHash = (
      await PasswordHash.create(password, hasher)
    ).getRight();

    // Creating authntication
    const authenticationId = uuidv4();
    const authentication = new Authentication(
      authenticationId,
      email,
      passwordHash
    );

    return {
      id,
      username,
      name,
      email,
      cpf,
      role,
      authentication,
    };
  }

  test('should create a user with valid properties', async () => {
    const userData = await makeSut();

    const user = new User(
      userData.id,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.role,
      userData.authentication
    );

    expect(user.name.get()).toBe(userData.name.get());
    expect(user.id).toBe(userData.id);
    expect(user.username.get()).toBe(userData.username.get());
    expect(user.email.get()).toBe(userData.email.get());
    expect(user.cpf.get()).toBe(userData.cpf.get());
    expect(user.role.get()).toBe(userData.role.get());
    expect(user.passwordHash).toBe(userData.authentication.passwordHash);
  });

  test("should active the user's section", async () => {
    7;
    const userData = await makeSut();

    const user = new User(
      userData.id,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.role,
      userData.authentication
    );

    const fakeSessionToken = 'fakeSessionToken123';
    user.activeSession(fakeSessionToken);

    expect(user.sessionToken).toBe(fakeSessionToken);
  });

  test("should desactive the user's section", async () => {
    7;
    const userData = await makeSut();

    const user = new User(
      userData.id,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.role,
      userData.authentication
    );

    const fakeSessionToken = 'fakeSessionToken123';
    user.activeSession(fakeSessionToken);

    user.desactiveSession();

    expect(user.sessionToken).toBe(undefined);
  });

  // Add more tests as needed
});
