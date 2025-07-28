import { Address } from './Address';
import { AddressProps } from './props/AddressProps';

describe('Testing Address entity', () => {
  const addressProps: AddressProps = {
    street: 'Rua Mariano Sanches',
    city: 'Nova Iguaçu',
    state: 'Rio de Janeiro',
    zipCode: '25888753',
  };

  test('should create a valid Address entity', () => {
    const address = new Address(addressProps);
    const addressId = 'fdkafnsdnnafkdjiIdtesst-test';
    const setIdResult = address.setId(addressId);

    expect(setIdResult.isRight()).toBeTruthy();
    expect(address.id).toBe(addressId);
    expect(address.street).toBe(addressProps.street);
    expect(address.city).toBe(addressProps.city);
    expect(address.state).toBe(addressProps.state);
    expect(address.zipCode).toBe(addressProps.zipCode);
    expect(address.createdAt).toBeTruthy();
  });

  test('should throw an error when trying to modify immutable properties after they are set', () => {
    const address = new Address(addressProps);
    const addressId = 'fdkafnsdnnafkdjiIdtesst-test';

    address.setId(addressId);
    const setIdResult = address.setId('id-afdsnakfnasdkf');

    expect(setIdResult.isLeft()).toBeTruthy();
  });

  test('should update Address', () => {
    const address = new Address(addressProps);
    address.update({ city: 'Updated' });

    expect(address.street).toBe(addressProps.street);
    expect(address.city).toBe('Updated');
    expect(address.state).toBe(addressProps.state);
    expect(address.zipCode).toBe(addressProps.zipCode);
  });
});
