import { Password } from '../';


describe('Testing Phone validator', () => {
  test('Trying to create a valid password', async () => {
    const validPassword = 'Test123*@!55';
    const passwordOrError = Password.create(validPassword);

    expect(passwordOrError.isRight()).toBeTruthy();
    expect(passwordOrError.getRight().getValue()).toBe(validPassword);
  });
});
