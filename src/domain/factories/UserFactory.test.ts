import { BcryptHasher } from '../../infrastructure/cryptography/BcryptHasher';
import { UserFactory } from './UserFactory';

describe('Testing UserFactory class', () => {
  const user = {
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

  test('Should create an user with customer role', async () => {
    const hasher = new BcryptHasher(12);

    const userEntity = (await UserFactory.create(user, hasher)).getRight();

    expect(userEntity.username).toBe(user.username);
    expect(userEntity.name).toBe(user.name);
    expect(userEntity.email).toBe(user.email);
    expect(userEntity.cpf).toBe(user.cpf);
    expect(userEntity.role).toBe(user.role);
    expect(userEntity.phone).toBe(user.phone);
    expect(userEntity.birthday.getTime()).toBe(
      new Date(user.birthday).getTime()
    );
    expect(userEntity.email).toBe(user.email);
    expect(userEntity.address.street).toBe(user.address.street);
    expect(userEntity.address.city).toBe(user.address.city);
    expect(userEntity.address.state).toBe(user.address.state);
    expect(userEntity.address.zipCode).toBe(user.address.zipCode);
    expect(hasher.compare(user.authentication.password, userEntity.passwordHash))
  });
});
