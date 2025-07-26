import { Phone } from '../';

describe('Testing Phone validator', () => {
  test('Trying to create a valid phone', () => {
    const validPhone = '21-555875028';
    const phoneOrError = Phone.create(validPhone);
    const gotPhone = phoneOrError.getRight();

    expect(phoneOrError.isRight()).toBeTruthy();
    expect(validPhone).toBe(gotPhone.getValue());
  });

  test('Trying to create phone without simbols', () => {
    const validPhone = '21555875028';
    const phoneOrError = Phone.create(validPhone);
    const gotPhone = phoneOrError.getRight();

    expect(phoneOrError.isRight()).toBeTruthy();
    expect(validPhone).toBe(gotPhone.getValue());
  });

  test('Trying to create a phone with more than 12 characteres', () => {
    let tooLongPhone = '';

    for (let i = 0; i < 15; i++) {
      tooLongPhone += '8';
    }

    const phoneOrError = Phone.create(tooLongPhone);

    expect(phoneOrError.isLeft()).toBeTruthy();
  });

  test('Trying to create phone with wrong format', () => {
    let invalidPhone = '55*575577756';

    const phoneOrError = Phone.create(invalidPhone);

    expect(phoneOrError.isLeft()).toBeTruthy();
  });

  test('Trying to create phone with 10 digits (it should has at least 11)', () => {
    let invalidPhone = '8848415415';

    const phoneOrError = Phone.create(invalidPhone);

    expect(phoneOrError.isLeft()).toBeTruthy();
  });
});
