import { CustomerDTO } from '../../../src/presentation/dtos/custumer-dto';
import { CustomerProps } from '../../../src/domain/entities/customer-props';
import { CustomerDtoMapper } from '../../../src/presentation/mappers/CustomerDtoMapper';
import {
  Name,
  Address,
  Email,
  Cpf,
  Phone,
  Role,
  Password,
  HashedPassword,
} from '../../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';
import bcrypt from 'bcryptjs';

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

    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerDto
    );

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

    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerDto
    );

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

    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerDto
    );

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

    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerDto
    );

    expect(customerPropsOrError.isLeft()).toBeTruthy();
  });

  test('Should map a CustomerProps to CustomerDto', async () => {
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

    const salt = 12;
    const hasher = new BcryptHasher(salt);
    const password = Password.create(
      customerDto.authentication.password
    ).getRight();

    const customerProps: CustomerProps = {
      username: Name.create(customerDto.username).getRight(),
      email: Email.create(customerDto.email).getRight(),
      cpf: Cpf.create(customerDto.cpf).getRight(),
      phone: Phone.create(customerDto.phone).getRight(),
      role: Role.create(customerDto.role).getRight(),
      address: Address.create(customerDto.address).getRight(),
      authentication: {
        hashedPassword: (
          await HashedPassword.create(password, hasher)
        ).getRight(),
      },
    };

    const mappedCustomerDto = CustomerDtoMapper.fromPropsToDto(customerProps);

    expect(mappedCustomerDto.username).toBe(customerDto.username);
    expect(mappedCustomerDto.email).toBe(customerDto.email);
    expect(mappedCustomerDto.cpf).toBe(customerDto.cpf);
    expect(mappedCustomerDto.phone).toBe(customerDto.phone);
    expect(mappedCustomerDto.role).toBe(customerDto.role);
    expect(mappedCustomerDto.address).toEqual(customerDto.address);
    expect(
      bcrypt.compare(
        mappedCustomerDto.authentication.password,
        customerDto.authentication.password
      )
    ).toBeTruthy();
  });
});
