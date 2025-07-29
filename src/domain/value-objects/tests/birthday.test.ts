import { Birthday } from '..';

describe('Testing Birhtday value object', () => {
  test('Trying to create a valid date', () => {
    const validDate = new Date('2002-02-26');
    const birthdayOrError = Birthday.create(validDate);

    expect(birthdayOrError.isRight()).toBeTruthy();
    expect(birthdayOrError.getRight().getValue()).toBe(validDate);
  });

  test('should create a valid Birthday from persistence', () => {
    const validDate = new Date('2002-02-26');
    const birthday = Birthday.createFromPersistence(validDate);

    expect(birthday.getValue()).toBe(validDate);
  });

  test('Should not create Birthday with invalid date', () => {
    const invalidDate = new Date('2002--26#');
    const birthdayOrError = Birthday.create(invalidDate);

    expect(birthdayOrError.isLeft()).toBeTruthy();
  });
});
