import { CustomerDTO } from '../../../src/presentation/dtos/custumer-dto';
import { CustomerProps } from '../../../src/domain/entities/customer-props';
import { CustomerDtoMapper } from '../../../src/presentation/mappers/CustomerDtoMapper';

describe('Testing CustomerDtoMapper', () => {
  test('Should map a CustomerDto to CustomerProps', async () => {
    const customerDto: CustomerDTO = {
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

    const customerPropsOrError = CustomerDtoMapper.fromDtoToProps(customerDto);

    expect(customerPropsOrError.isRight()).toBeTruthy();
  });

  test('Should return an error when tryng to map an customer with invalid name', async () => {
    const customerDto: CustomerDTO = {
      username: 'Marta15',
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

    const customerPropsOrError = CustomerDtoMapper.fromDtoToProps(customerDto);

    expect(customerPropsOrError.isLeft()).toBeTruthy();
  });

  test('Should return an error when tryng to map an user with invalid email', async () => {
    const customerDto: CustomerDTO = {
      username: 'Marta',
      email: 'bugmail.com',
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

    const customerPropsOrError = CustomerDtoMapper.fromDtoToProps(customerDto);

    expect(customerPropsOrError.isLeft()).toBeTruthy();
  });

});
