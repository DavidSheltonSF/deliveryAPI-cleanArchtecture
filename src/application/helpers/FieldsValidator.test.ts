import { FieldsValidator } from './FieldsValidator';

describe('Test FieldsValidator', () => {
  test('Should check if a field is recognized by the validator class', () => {
    const validField = 'username';
    const invalidField = 'fkdsafjdanfudn';
    expect(FieldsValidator.fieldIsRecognized(validField)).toBeTruthy();
    expect(FieldsValidator.fieldIsRecognized(invalidField)).toBeFalsy();
  });

  test('Should validade a single field', () => {
    const validField = { key: 'name', value: 'Jorel' };
    const invalidField = { key: 'name', value: 'Jorel125' };
    const validResult = FieldsValidator.validateOne(
      validField.key,
      validField.value
    );
    const invalidResult = FieldsValidator.validateOne(
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

    const result = FieldsValidator.validateFields(fields);

    expect(result.isRight()).toBeTruthy();
  });

  test('Should find any invalid field', () => {
    const fields = {
      username: 'David123',
      name: 'David',
      password: 'senhafraca',
    };

    const result = FieldsValidator.validateFields(fields);

    expect(result.isLeft()).toBeTruthy();
  });
});
