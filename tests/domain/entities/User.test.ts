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
  test('should create a user with valid properties', async () => {
    const hasher = new BcryptHasher(12);
    const password = Password.create('Dae84*jifsjf21').getRight();
    const passwordHash = (
      await PasswordHash.create(password, hasher)
    ).getRight();

    const id = uuidv4();
    const username = UserName.create('Carlos').getRight();
    const name = Name.create('Carlos Montenegro').getRight();
    const email = Email.create('carlos@bugmail.com').getRight();
    const cpf = Cpf.create('12588774825').getRight();
    const role = Role.create('admin').getRight();

    const authenticationId = uuidv4();
    const authentication = new Authentication(
      authenticationId,
      email,
      passwordHash
    );

    const user = new User(id, username, name, email, cpf, role, authentication);

    expect(user.name.get()).toBe(name.get());
    expect(user.id).toBe(id);
    expect(user.username.get()).toBe(username.get());
    expect(user.email.get()).toBe(email.get());
    expect(user.cpf.get()).toBe(cpf.get());
    expect(user.role.get()).toBe(role.get());
    expect(user.passwordHash).toBe(passwordHash);
  });

  // Add more tests as needed
});
