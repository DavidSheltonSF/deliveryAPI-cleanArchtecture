import { Birthday } from '../../src/domain/entities/value-objects';

describe('Testing Birhtday value object', () => {
  test('Trying to create a valid date', () => {
    const validBirthday = '2002-02-26';
    const birthdayOrError = Birthday.create(validBirthday);

    expect(birthdayOrError.isRight()).toBeTruthy();
    expect(birthdayOrError.getRight().get()).toBe(validBirthday);
  });
});
