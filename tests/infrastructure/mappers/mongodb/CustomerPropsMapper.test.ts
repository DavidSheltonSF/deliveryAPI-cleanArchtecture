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
} from '../../../../src/domain/entities/value-objects';
import { MockData } from '../../../_helpers/mockData';
import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';

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

    const customerId = MockData.generateHexId();
    const customerProps: CustomerProps = {
      username: Name.create(customerData.username).getRight(),
      email: Email.create(customerData.email).getRight(),
      cpf: Cpf.create(customerData.cpf).getRight(),
      phone: Phone.create(customerData.phone).getRight(),
      role: Role.create(customerData.role).getRight(),
      address: Address.create(customerData.address).getRight(),
      authentication: {
        passwordHash: Password.create(
          customerData.authentication.password
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
    expect(mappedCustomerModel.authentication.passwordHash).toBe(
      customerData.authentication.password
    );
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

    const mappedCustomerProps =
      CustomerPropsMapper.fromModelToProps(customerModel);

    expect(mappedCustomerProps.getRight()).toBeTruthy();
  });
});
