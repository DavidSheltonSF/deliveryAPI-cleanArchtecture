import { ZipCode } from '../../../src/domain/entities/value-objects';

describe('Testing ZipCode validator', () => {
  test('Trying to create a valid zipcode', () => {
    const validZipCode = '25877483';
    const zipCode = ZipCode.create(validZipCode);

    expect(zipCode.isRight()).toBeTruthy();
    expect(zipCode.getRight().get()).toBe(validZipCode);
  });

  test('Trying to create a zipcode with less than 8 digits', () => {
    const tooShortZipCode = '2587748';
    const zipCode = ZipCode.create(tooShortZipCode);

    expect(zipCode.isLeft()).toBeTruthy();
  });

  test('Trying to create a zipcode with more than 8 digits', () => {
    const tooLongZipCode = '258774830';
    const zipCode = ZipCode.create(tooLongZipCode);

    expect(zipCode.isLeft()).toBeTruthy();
  });

  test('Trying to create a zipcode with invalid characters', () => {
    const invalidZipCode = '2a87748#';
    const zipCode = ZipCode.create(invalidZipCode);

    expect(zipCode.isLeft()).toBeTruthy();
  });
});
