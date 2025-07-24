import { UserFieldsValidator } from './UserFieldsValidator';

describe('Test UserFieldsValidator', () => {
  test('Should check if a field is recognized by the validator class', () => {
    const validField = 'username';
    const invalidField = 'fkdsafjdanfudn';
    expect(UserFieldsValidator.fieldIsRecognized(validField)).toBeTruthy();
    expect(UserFieldsValidator.fieldIsRecognized(invalidField)).toBeFalsy();
  });

  test('Should validade a single field', () => {
    const validField = { key: 'name', value: 'Jorel' };
    const invalidField = { key: 'name', value: 'Jorel125' };
    const validResult = UserFieldsValidator.validateOne(
      validField.key,
      validField.value
    );
    const invalidResult = UserFieldsValidator.validateOne(
      invalidField.key,
      invalidField.value
    );
    expect(validResult.isRight()).toBeTruthy();
    expect(invalidResult.isLeft()).toBeTruthy();
  });

  test('Should validate all vailid fields provided', () => {
    const fields = {
      username: 'David123',
      name: 'David',
      password: 'D#@%$df155',
    };

    const result = UserFieldsValidator.validateFields(fields);

    expect(result.isRight()).toBeTruthy();
  });

  test('Should find any invalid field', () => {
    const fields = {
      username: 'David123',
      name: 'David',
      password: 'senhafraca',
    };

    const result = UserFieldsValidator.validateFields(fields);

    expect(result.isLeft()).toBeTruthy();
  });
});
