import { UserName } from '../';

describe('Testing UserName validator', () => {
  test('Trying to create a valid username', () => {
    const validName = 'Maria Sílva de Oliveira';
    const nameOrError = UserName.create(validName);
    const gotName = nameOrError.getRight();

    expect(nameOrError.isRight()).toBeTruthy();
    expect(validName).toBe(gotName.getValue());
  });
});
