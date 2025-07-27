import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { Address } from '../entities/Address';
import { Authentication } from '../entities/Authentication';
import { UserFactory } from './UserFactory';

describe('Testing UserFactory class', () => {
  test('Should create an user with customer role', async () => {
    const customerDTO = {
      username: 'David55',
      name: 'David',
      email: 'david@bugmai.com',
      cpf: '14555774748',
      role: 'customer',
      phone: '21445854745',
      birthday: '2000-03-02',
      address: {
        street: 'Das Dores',
        city: 'Nova Iguaçu',
        state: 'Rio de Janeiro',
        zipCode: '45852258',
      },
      authentication: {
        password: '3$rrreaRsrefesa22',
      },
    };

    const addressProps = {
      id: 'resff',
      userId: 'fjonhihfag',
      ...customerDTO.address,
    };

    const hasher = new BcryptHasher(12);
    const password = 'fafdfdsga';
    const passwordHash = await hasher.hash(password);
    const authenticationProps = {
      id: 'fdsafdf',
      userId: 'fkinagagdga',
      passwordHash: passwordHash,
    };

    const address = new Address(addressProps);
    const authentication = new Authentication(authenticationProps, hasher);

    const customerProps = {
      ...customerDTO,
      birthday: new Date(customerDTO.birthday),
      address,
      authentication,
    };

    const customer = await UserFactory.create(customerProps);

    expect(customer.username).toBe(customerDTO.username);
    expect(customer.name).toBe(customerDTO.name);
    expect(customer.email).toBe(customerDTO.email);
    expect(customer.cpf).toBe(customerDTO.cpf);
    expect(customer.role).toBe(customerDTO.role);
    expect(customer.phone).toBe(customerDTO.phone);
    expect(customer.birthday.getTime()).toBe(
      new Date(customerDTO.birthday).getTime()
    );
    expect(customer.email).toBe(customerDTO.email);
    expect(customer.address.street).toBe(customerDTO.address.street);
    expect(customer.address.city).toBe(customerDTO.address.city);
    expect(customer.address.state).toBe(customerDTO.address.state);
    expect(customer.address.zipCode).toBe(customerDTO.address.zipCode);
    expect(customer.passwordIsValid(password)).toBeTruthy();
  });

  test('Should create an user with admin role', async () => {
    const adminDTO = {
      username: 'David55',
      name: 'David',
      email: 'david@bugmai.com',
      cpf: '14555774748',
      role: 'admin',
      phone: '21445854745',
      birthday: '2000-03-02',
      authentication: {
        password: '3$rrreaRsrefesa22',
      },
    };

    const hasher = new BcryptHasher(12);
    const password = 'fafdfdsga';
    const passwordHash = await hasher.hash(password);
    const authenticationProps = {
      id: 'fdsafdf',
      userId: 'fkinagagdga',
      passwordHash: passwordHash,
    };
    const authentication = new Authentication(authenticationProps, hasher);

    const adminProps = {
      ...adminDTO,
      birthday: new Date(adminDTO.birthday),
      authentication,
    };

    const admin = await UserFactory.create(adminProps);

    expect(admin.username).toBe(adminDTO.username);
    expect(admin.name).toBe(adminDTO.name);
    expect(admin.email).toBe(adminDTO.email);
    expect(admin.cpf).toBe(adminDTO.cpf);
    expect(admin.role).toBe(adminDTO.role);
    expect(admin.phone).toBe(adminDTO.phone);
    expect(admin.birthday.getTime()).toBe(
      new Date(adminDTO.birthday).getTime()
    );
    expect(admin.email).toBe(adminDTO.email);
    expect(admin.passwordIsValid(password)).toBeTruthy();
  });
});
