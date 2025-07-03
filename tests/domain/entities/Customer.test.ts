import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../../src/domain/entities/user/customer/Customer';
import { Address } from '../../../src/domain/entities/address/Address';

import {
  Birthday,
  Cpf,
  Email,
  Name,
  Password,
  PasswordHash,
  Phone,
  Role,
  UserName,
  ZipCode,
} from '../../../src/domain/value-objects';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';
import { Authentication } from '../../../src/domain/entities/authentication/Authentication';
import { ObjectId } from 'mongodb';

describe('Customer Model', () => {
  async function makeSut() {
    const id = uuidv4();
    const username = UserName.create('Carlos').getRight();
    const name = Name.create('Carlos Montenegro').getRight();
    const email = Email.create('carlos@bugmail.com').getRight();
    const cpf = Cpf.create('12588774825').getRight();
    const phone = Phone.create('21585470558').getRight();
    const role = Role.create('admin').getRight();
    const birthday = Birthday.create(new Date('2005-08-14')).getRight();

    const addressId = new ObjectId().toString();
    const address = new Address(
      addressId,
      'Fake street',
      'Fake City',
      'Fake State',
      ZipCode.create('24786252').getRight()
    );

    // Creating hash password
    const hasher = new BcryptHasher(12);
    const password = Password.create('Dae84*jifsjf21').getRight();
    const passwordHash = (
      await PasswordHash.create(password, hasher)
    ).getRight();

    // Creating authntication
    const authenticationId = new ObjectId().toString();
    const authentication = new Authentication(
      authenticationId,
      email,
      passwordHash
    );

    return {
      id,
      username,
      name,
      email,
      cpf,
      phone,
      role,
      address,
      birthday,
      authentication,
    };
  }
  test('should create a customer with valid properties', async () => {
    const customerData = await makeSut();

    const customer = new Customer(
      customerData.id,
      customerData.username,
      customerData.name,
      customerData.email,
      customerData.cpf,
      customerData.phone,
      customerData.role,
      customerData.birthday,
      customerData.address,
      customerData.authentication
    );

    expect(customer.id).toBe(customerData.id);
    expect(customer.username.get()).toBe(customerData.username.get());
    expect(customer.name.get()).toBe(customerData.name.get());
    expect(customer.email.get()).toBe(customerData.email.get());
    expect(customer.cpf.get()).toBe(customerData.cpf.get());
    expect(customer.role.get()).toBe(customerData.role.get());
    expect(customer.phone.get()).toBe(customerData.phone.get());
    expect(customer.birthday.get()).toBe(customerData.birthday.get());
    expect(customer.passwordHash).toBe(
      customerData.authentication.passwordHash
    );
  });

  test('should check if a customer is an adult properly', async () => {
    const customerData = await makeSut();

    const adultCustomer = new Customer(
      customerData.id,
      customerData.username,
      customerData.name,
      customerData.email,
      customerData.cpf,
      customerData.phone,
      customerData.role,
      Birthday.create(new Date('2000-02-23')).getRight(),
      customerData.address,
      customerData.authentication
    );

    const nonAdultCustomer = new Customer(
      customerData.id,
      customerData.username,
      customerData.name,
      customerData.email,
      customerData.cpf,
      customerData.phone,
      customerData.role,
      Birthday.create(new Date('2015-02-23')).getRight(),
      customerData.address,
      customerData.authentication
    );

    expect(adultCustomer.isAdult()).toBeTruthy();
    expect(nonAdultCustomer.isAdult()).toBeFalsy();
  });

  // Add more tests as needed
});
