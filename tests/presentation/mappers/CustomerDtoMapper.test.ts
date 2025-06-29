import { CustomerDto } from '../../../src/presentation/dtos/custumer-dto';
import { CustomerProps } from '../../../src/domain/entities/customer/CustomerProps';
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
  UserName,
  Birthday,
} from '../../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';
import bcrypt from 'bcryptjs';

describe('Testing CustomerDtoMapper', () => {
  const customerDto: CustomerDto = {
    username: 'Marta',
    name: 'Marta Sanshes',
    email: 'mart@bugmail.com',
    cpf: '88888888888',
    phone: '21555777777',
    role: 'admin',
    birthday: '2005-05-05',
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

  test('Should map a CustomerDto to CustomerProps', async () => {
    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerDto
    );

    expect(customerPropsOrError.isRight()).toBeTruthy();
  });

  test('Should return an error when tryng to map an customer with invalid name', async () => {

    const customerWithInvalidName = { ...customerDto };
    customerWithInvalidName.name = 'MaiaraSanshes1488asf#';

    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerWithInvalidName
    );

    expect(customerPropsOrError.isLeft()).toBeTruthy();
  });

  test('Should return an error when tryng to map an user with invalid email', async () => {
    const customerWithInvalidEmail = { ...customerDto };
    customerWithInvalidEmail.email = 'email#';

    const customerPropsOrError = await CustomerDtoMapper.fromDtoToProps(
      customerWithInvalidEmail
    );

    expect(customerPropsOrError.isLeft()).toBeTruthy();
  });

  test('Should map a CustomerProps to CustomerDto', async () => {
    const salt = 12;
    const hasher = new BcryptHasher(salt);
    const password = Password.create(
      customerDto.authentication.password
    ).getRight();

    const customerProps: CustomerProps = {
      username: UserName.create(customerDto.username).getRight(),
      name: Name.create(customerDto.name).getRight(),
      email: Email.create(customerDto.email).getRight(),
      cpf: Cpf.create(customerDto.cpf).getRight(),
      phone: Phone.create(customerDto.phone).getRight(),
      role: Role.create(customerDto.role).getRight(),
      address: Address.create(customerDto.address).getRight(),
      birthday: Birthday.create(customerDto.birthday).getRight(),
      authentication: {
        hashedPassword: (
          await HashedPassword.create(password, hasher)
        ).getRight(),
      },
    };

    const mappedCustomerDto = CustomerDtoMapper.fromPropsToDto(customerProps);

    expect(mappedCustomerDto.username).toBe(customerDto.username);
    expect(mappedCustomerDto.name).toBe(customerDto.name);
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
