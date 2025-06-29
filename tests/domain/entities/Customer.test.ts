import { Customer } from '../../../src/domain/entities/customer/Customer';
import { CustomerProps } from '../../../src/domain/entities/customer/CustomerProps';
import {
  Address,
  Birthday,
  Cpf,
  Email,
  HashedPassword,
  Name,
  Password,
  Phone,
  Role,
  UserName,
} from '../../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';

describe('Customer Model', () => {
  it('should create a customer with valid properties', async () => {
    const hasher = new BcryptHasher(12);
    const password = Password.create('Dae84*jifsjf21').getRight();
    const hashedPassword = (
      await HashedPassword.create(password, hasher)
    ).getRight();

    const customerProps: CustomerProps = {
      username: UserName.create('Carlos').getRight(),
      name: Name.create('Carlos Montenegro').getRight(),
      email: Email.create('carlos@bugmail.com').getRight(),
      cpf: Cpf.create('12588774825').getRight(),
      phone: Phone.create('21585874596').getRight(),
      role: Role.create('admin').getRight(),
      birthday: Birthday.create('2002-02-26').getRight(),
      address: Address.create({
        street: 'Rua dos Morangos',
        city: 'Cidade dos Anjos',
        state: 'Rio de Janeiro',
        zipCode: '25874129',
      }).getRight(),
      authentication: {
        hashedPassword: hashedPassword,
      },
    };

    const customer = new Customer(customerProps);

    expect(customer.name.get()).toBe(customerProps.name.get());
  });

  // Add more tests as needed
});
