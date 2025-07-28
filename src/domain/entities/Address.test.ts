import { Address } from './Address';

describe('Testing Address entity', () => {
  const addressData = {
    street: 'Rua Mariano Sanches',
    city: 'Nova Iguaçu',
    state: 'Rio de Janeiro',
    zipCode: '25888753',
  };

  test('Should create a valid Address entity', () => {
    const address = new Address(addressData);
    const addressId = 'fdkafnsdnnafkdjiIdtesst-test';
    const setIdResult = address.setId(addressId);
    const addressCreatedAt = new Date();
    const setCreatedAtResult = address.setCreatedAt(addressCreatedAt);

    expect(setIdResult.isRight()).toBeTruthy();
    expect(address.id).toBe(addressId);
    expect(address.street).toBe(addressData.street);
    expect(address.city).toBe(addressData.city);
    expect(address.state).toBe(addressData.state);
    expect(address.zipCode).toBe(addressData.zipCode);
    expect(setCreatedAtResult.isRight()).toBeTruthy();
    expect(address.createdAt).toBe(addressCreatedAt);
  });

  test('Should update Address', () => {
    const address = new Address(addressData);
    address.update({ city: 'Updated' });

    expect(address.street).toBe(addressData.street);
    expect(address.city).toBe('Updated');
    expect(address.state).toBe(addressData.state);
    expect(address.zipCode).toBe(addressData.zipCode);
  });
});
