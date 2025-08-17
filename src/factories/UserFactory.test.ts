import { UserFactory } from './UserFactory';
import { UserMocker } from '../tests/mocks/UserMocker';
import {makeMockHasher} from '../tests/mocks/mockHasher'

describe('Testing UserFactory', () => {
  const hasher = makeMockHasher()
  test('should return right if all values are valid', async () => {
    const userData = UserMocker.mockUserDTO();
    const userOrError = await UserFactory.create(userData, hasher);
    expect(userOrError.isRight());
  });

  test('should create an user with all data provided', async () => {
    const userData = UserMocker.mockUserDTO();
    const userOrError = await UserFactory.create(userData, hasher);
    const user = userOrError.getRight();
    expect(user.firstName.getValue()).toBe(userData.firstName);
    expect(user.lastName.getValue()).toBe(userData.lastName);
    expect(user.email.getValue()).toBe(userData.email);
    expect(user.cpf.getValue()).toBe(userData.cpf);
    expect(user.phone.getValue()).toBe(userData.phone);
    expect(user.role).toBe(userData.role);
    expect(user.birthday.getValue().getTime()).toBe(
      new Date(userData.birthday).getTime()
    );
  });

  test('should return error if firstname is nos provides', async () => {
    const userData = UserMocker.mockUserDTO();
    userData.firstName = '';
    const userOrError = await UserFactory.create(userData, hasher);
    expect(userOrError.isLeft());
  });

  test('should return error if role is invalid', async () => {
    const userData = UserMocker.mockUserDTO();
    userData.role = 'Invalidrole';
    const userOrError = await UserFactory.create(userData, hasher);
    expect(userOrError.isLeft());
  });

  test('should create an user from persistence with all data provided', async () => {
    const data = UserMocker.mockUserDTO();
    const userData = {
      id: 'sdifnasfinadf',
      ...data,
      passwordHash: await hasher.hash(data.password),
      createdAt: new Date(),
      birthday: new Date()
    }
    const user = UserFactory.createFromPersistence(userData);
    expect(user.firstName.getValue()).toBe(userData.firstName);
    expect(user.lastName.getValue()).toBe(userData.lastName);
    expect(user.email.getValue()).toBe(userData.email);
    expect(user.cpf.getValue()).toBe(userData.cpf);
    expect(user.phone.getValue()).toBe(userData.phone);
    expect(user.role).toBe(userData.role);
    expect(user.birthday.getValue().getTime()).toBe(
      new Date(userData.birthday).getTime()
    );
  });
});
