import { AddressFactory } from './AddressFactory';
import { AddressMocker } from '../tests/mocks/AddressMocker';

describe('Testing AddressFactory', () => {
  function makeSut() {
    const addressData = AddressMocker.mockAddressDTO();

    return {
      addressData,
    };
  }

  test('should return right if all values are valid', () => {
    const { addressData } = makeSut();
    const addressOrError = AddressFactory.create(addressData);
    expect(addressOrError.isRight());
  });

  test('should create an address with all data provided', () => {
    const { addressData } = makeSut();
    const addressOrError = AddressFactory.create(addressData);

    const address = addressOrError.getRight();

    expect(address.street).toBe(addressData.street);
    expect(address.city).toBe(addressData.city);
    expect(address.state).toBe(addressData.state);
    expect(address.zipCode.getValue()).toBe(addressData.zipCode);
  });

  test('should return error if password is nos provided', () => {
    const { addressData } = makeSut();
    const addressOrError = AddressFactory.create(addressData);

    expect(addressOrError.isLeft());
  });

  test('should create an address from persistence with all data provided', async () => {
    const addressData = {
      id: 'sdifnasfinadf',
      userId: 'fsidanfaihfa',
      street: 'Fake Streeet',
      city: 'Fake City',
      state: 'Fake State',
      zipCode: '21478745',
      createdAt: new Date(),
      birthday: new Date(),
    };
    const address = AddressFactory.createFromPersistence(addressData);

    expect(address.street).toBe(addressData.street);
    expect(address.city).toBe(addressData.city);
    expect(address.state).toBe(addressData.state);
    expect(address.zipCode.getValue()).toBe(addressData.zipCode);
  });
});
