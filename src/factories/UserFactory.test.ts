import { UserFactory } from './UserFactory';
import { UserMocker } from '../tests/mocks/UserMocker';

describe('Testing UserFactory', () => {
  test('should return right if all values are valid', () => {
    const userData = UserMocker.mockUserDTO();
    const userOrError = UserFactory.create(userData);
    expect(userOrError.isRight());
  });

  test('should create an user with all data provided', () => {
    const userData = UserMocker.mockUserDTO();
    const userOrError = UserFactory.create(userData);
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

  test('should return error if firstname is nos provides', () => {
    const userData = UserMocker.mockUserDTO();
    userData.firstName = '';
    const userOrError = UserFactory.create(userData);
    expect(userOrError.isLeft());
  });
  test('should return error if role is invalid', () => {
    const userData = UserMocker.mockUserDTO();
    userData.role = 'Invalidrole';
    const userOrError = UserFactory.create(userData);
    expect(userOrError.isLeft());
  });
});
