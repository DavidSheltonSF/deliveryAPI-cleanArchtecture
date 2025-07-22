import { Birthday } from '../../../src/domain/value-objects';

describe('Testing Birhtday value object', () => {
  test('Trying to create a valid date', () => {
    const validDate = new Date('2002-02-26');
    const birthdayOrError = Birthday.create(validDate);

    expect(birthdayOrError.isRight()).toBeTruthy();
    expect(birthdayOrError.getRight().get()).toBe(validDate);
  });

  test('Should not create Birthday with invalid date', () => {
    const invalidDate = new Date('2002--26#');
    const birthdayOrError = Birthday.create(invalidDate);

    expect(birthdayOrError.isLeft()).toBeTruthy();
  });
});
