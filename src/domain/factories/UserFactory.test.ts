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

    const userEntity = (await UserFactory.create(user, hasher));

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
    expect(
      hasher.compare(user.authentication.password, userEntity.passwordHash)
    );
  });

  test('Should create an user with admin role', async () => {
    const admin = {
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

    const adminEntity = (await UserFactory.create(admin, hasher));

    expect(adminEntity.username).toBe(admin.username);
    expect(adminEntity.name).toBe(admin.name);
    expect(adminEntity.email).toBe(admin.email);
    expect(adminEntity.cpf).toBe(admin.cpf);
    expect(adminEntity.role).toBe(admin.role);
    expect(adminEntity.phone).toBe(admin.phone);
    expect(adminEntity.birthday.getTime()).toBe(
      new Date(admin.birthday).getTime()
    );
    expect(adminEntity.email).toBe(admin.email);
    expect(
      hasher.compare(admin.authentication.password, adminEntity.passwordHash)
    );
  });
});
