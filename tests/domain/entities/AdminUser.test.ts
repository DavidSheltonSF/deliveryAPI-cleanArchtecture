import { AdminUser } from '../../../src/domain/entities/user/admin/AdminUser';
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
} from '../../../src/domain/value-objects';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';
import { Authentication } from '../../../src/domain/entities/authentication/Authentication';
import { ObjectId } from 'mongodb';

describe('AdminUser Model', () => {
  async function makeSut() {
    const username = UserName.create('Carlos').getRight();
    const name = Name.create('Carlos Montenegro').getRight();
    const email = Email.create('carlos@bugmail.com').getRight();
    const cpf = Cpf.create('12588774825').getRight();
    const phone = Phone.create('21585470558').getRight();
    const role = Role.create('admin').getRight();
    const birthday = Birthday.create(new Date('2005-08-14')).getRight();

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
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      authentication,
    };
  }

  test('should create a adminuser with valid properties', async () => {
    const adminuserData = await makeSut();

    const adminuserId = new ObjectId().toString();
    const adminuser = new AdminUser(
      adminuserId,
      adminuserData.username,
      adminuserData.name,
      adminuserData.email,
      adminuserData.cpf,
      adminuserData.phone,
      adminuserData.role,
      adminuserData.birthday,
      adminuserData.authentication
    );

    expect(adminuser.name.get()).toBe(adminuserData.name.get());
    expect(adminuser.id).toBe(adminuserId);
    expect(adminuser.username.get()).toBe(adminuserData.username.get());
    expect(adminuser.email.get()).toBe(adminuserData.email.get());
    expect(adminuser.cpf.get()).toBe(adminuserData.cpf.get());
    expect(adminuser.role.get()).toBe(adminuserData.role.get());
    expect(adminuser.passwordHash).toBe(
      adminuserData.authentication.passwordHash
    );
  });
});
