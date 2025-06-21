import { CustomerPropsMapper } from '../../../../src/infrastructure/mappers/mongodb/CustomerPropsMapper';
import { CustomerModel } from '../../../../src/infrastructure/models/mongodb/customer-model';
import { CustomerProps } from '../../../../src/domain/entities/customer-props';
import {
  Name,
  Address,
  Email,
  Cpf,
  Phone,
  Role,
  Password,
  HashedPassword,
} from '../../../../src/domain/entities/value-objects';
import { MockData } from '../../../_helpers/mockData';
import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { BcryptHasher } from '../../../../src/infrastructure/cryptography/BcryptHasher';
import bcrypt from 'bcryptjs';

describe('Testing CustomerPropsMapper', () => {
  test('Should map a CustomerProps to CustomerModel', async () => {
    const customerData = {
      username: 'Marta',
      email: 'mart@bugmail.com',
      cpf: '88888888888',
      phone: '21555777777',
      role: 'admin',
      address: {
        street: 'test streed',
        city: 'Belford Roxo',
        state: 'Rio de Janeiro',
        zipCode: '22222220',
      },
      authentication: {
        password: 'teste123*Testing',
      },
    };

    const salt = 12;
    const hasher = new BcryptHasher(salt);
    const password = Password.create(
      customerData.authentication.password
    ).getRight();

    const customerId = MockData.generateHexId();
    const customerProps: CustomerProps = {
      username: Name.create(customerData.username).getRight(),
      email: Email.create(customerData.email).getRight(),
      cpf: Cpf.create(customerData.cpf).getRight(),
      phone: Phone.create(customerData.phone).getRight(),
      role: Role.create(customerData.role).getRight(),
      address: Address.create(customerData.address).getRight(),
      authentication: {
        hashedPassword: (
          await HashedPassword.create(password, hasher)
        ).getRight(),
      },
    };

    const mappedCustomerModel = CustomerPropsMapper.fromPropsToModel(
      customerId,
      customerProps
    );

    expect(mappedCustomerModel._id.toString()).toBe(customerId);
    expect(mappedCustomerModel.username).toBe(customerData.username);
    expect(mappedCustomerModel.email).toBe(customerData.email);
    expect(mappedCustomerModel.cpf).toBe(customerData.cpf);
    expect(mappedCustomerModel.phone).toBe(customerData.phone);
    expect(mappedCustomerModel.role).toBe(customerData.role);
    expect(mappedCustomerModel.address).toEqual(customerData.address);
    expect(
      bcrypt.compare(
        customerData.authentication.password,
        mappedCustomerModel.authentication.passwordHash
      )
    ).toBeTruthy();
  });

  test('Should map a CustomerModel to CustomerProps', async () => {
    const customerModel: CustomerModel = {
      _id: mongoHelper.toObjectId(MockData.generateHexId()),
      username: 'Marta',
      email: 'mart@bugmail.com',
      cpf: '88888888888',
      phone: '21555777777',
      role: 'admin',
      address: {
        street: 'test streed',
        city: 'Belford Roxo',
        state: 'Rio de Janeiro',
        zipCode: '22222220',
      },
      authentication: {
        passwordHash: 'teste123*Testing',
      },
      createdAt: new Date(),
    };

    const mappedCustomerProps = await CustomerPropsMapper.fromModelToProps(
      customerModel
    );

    expect(mappedCustomerProps.getRight()).toBeTruthy();
  });
});
