import { AddressFactory } from './AddressFactory';

describe('Testing UserName validator', () => {
  const addresses = [
    {
      street: 'Rua dos Anjos',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '25847748',
    },
    {
      street: 'Rua Euníce',
      city: 'Nova Iguaçu',
      state: 'Rio de Janeiro',
      zipCode: '25844448',
    },
  ];

  test('Should create an Address domain entity properly', () => {

    const address = addresses[0];

    const addressEntity = AddressFactory.create(address).getRight()

    expect(addressEntity.street).toBe(address.street);
    expect(addressEntity.city).toBe(address.city);
    expect(addressEntity.state).toBe(address.state);
    expect(addressEntity.zipCode).toBe(address.zipCode);
  });
});
