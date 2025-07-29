import { UserName } from '../';

describe('Testing UserName validator', () => {
  test('Trying to create a valid username', () => {
    const validName = 'Maria Sílva de Oliveira';
    const nameOrError = UserName.create(validName);
    const gotName = nameOrError.getRight();

    expect(nameOrError.isRight()).toBeTruthy();
    expect(validName).toBe(gotName.getValue());
  });

  test('should create a valid UserName from persistence', () => {
    const validName = 'Maria Sílva de Oliveira';
    const name = UserName.createFromPersistence(validName);

    expect(name.getValue()).toBe(validName);
  });
});
