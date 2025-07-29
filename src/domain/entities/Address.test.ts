import { MongodbIdAdapter } from '../../infrastructure/adapters/MongodbIdAdapter';
import { Address } from './Address';
import { RawAddressProps } from './rawProps/RawAddressProps';

describe('Testing Address entity', () => {

  const idAdapter = new MongodbIdAdapter();

  const addressProps: RawAddressProps = {
    street: 'Rua Mariano Sanches',
    city: 'Nova Iguaçu',
    state: 'Rio de Janeiro',
    zipCode: '25888753',
  };

  function makeValidAddress(props: RawAddressProps): Address {
    const addressOrError = Address.create(props);
    return addressOrError.getRight();
  }

  test('should return an either right value if valid data were provided', () => {
    const addressOrError = Address.create(addressProps);
    expect(addressOrError.isRight()).toBeTruthy();
  });

  test('should create a valid Address entity', () => {
    const addressOrError = Address.create(addressProps);
    const address = addressOrError.getRight();

    expect(address.street).toBe(addressProps.street);
    expect(address.city).toBe(addressProps.city);
    expect(address.state).toBe(addressProps.state);
    expect(address.zipCode).toBe(addressProps.zipCode);
    expect(address.createdAt).toBeTruthy();
  });

  test('should update Address', () => {
    const address = makeValidAddress(addressProps);
    address.update({ city: 'Updated' });

    expect(address.street).toBe(addressProps.street);
    expect(address.city).toBe('Updated');
    expect(address.state).toBe(addressProps.state);
    expect(address.zipCode).toBe(addressProps.zipCode);
  });

   test('should create Address from a persistence model', async() => {
  
      const addressModel = {
        _id: idAdapter.generate(),
        userId: idAdapter.generate(),
        street: 'Rua Arnaldo Siqueira',
        city: 'São Paulo',
        state: 'São Paulo',
        zipCode: '25746458',
        createdAt: new Date()
      }
  
      const address = Address.createFromPersistence(addressModel)
  
      expect(address.id).toBe(addressModel._id.toString());
      expect(address.userId).toBe(addressModel.userId.toString());
      expect(address.street).toBe(addressModel.street);
      expect(address.city).toBe(addressModel.city);
      expect(address.state).toBe(addressModel.state);
      expect(address.zipCode).toBe(addressModel.zipCode);
    });
});
