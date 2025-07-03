import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../src/domain/entities/user/User';
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
import { Address } from '../../../src/domain/entities/address/Address';
import { ObjectId } from 'mongodb';
import { UserRole } from '../../../src/domain/value-objects/_enums';

describe('User Model', () => {
  async function makeSut() {
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

  test('should create a user with valid properties', async () => {
    const userData = await makeSut();

    const userId = new ObjectId().toString();
    const user = new User(
      userId,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      userData.role,
      userData.birthday,
      userData.authentication
    );

    expect(user.name.get()).toBe(userData.name.get());
    expect(user.id).toBe(userId);
    expect(user.username.get()).toBe(userData.username.get());
    expect(user.email.get()).toBe(userData.email.get());
    expect(user.cpf.get()).toBe(userData.cpf.get());
    expect(user.role.get()).toBe(userData.role.get());
    expect(user.passwordHash).toBe(userData.authentication.passwordHash);
  });

  test("should active the user's section", async () => {
    7;
    const userData = await makeSut();

    const userId = new ObjectId().toString();
    const user = new User(
      userId,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      userData.role,
      userData.birthday,
      userData.authentication
    );

    const fakeSessionToken = 'fakeSessionToken123';
    user.activeSession(fakeSessionToken);

    expect(user.sessionToken).toBe(fakeSessionToken);
  });

  test("should desactive the user's section", async () => {
    7;
    const userData = await makeSut();

    const userId = new ObjectId().toString();
    const user = new User(
      userId,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      userData.role,
      userData.birthday,
      userData.authentication
    );

    const fakeSessionToken = 'fakeSessionToken123';
    user.activeSession(fakeSessionToken);

    user.desactiveSession();

    expect(user.sessionToken).toBe(undefined);
  });

  test('should check if a customer is an adult properly', async () => {
    const userData = await makeSut();

    const adultUserId = new ObjectId().toString()
    const adultUser = new User(
      adultUserId,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      userData.role,
      Birthday.create(new Date('2000-02-23')).getRight(),
      userData.authentication
    );


    const nonAdultUserId = new ObjectId().toString();
    const nonAdultUser = new User(
      nonAdultUserId,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      userData.role,
      Birthday.create(new Date('2015-02-23')).getRight(),
      userData.authentication
    );

    expect(adultUser.isAdult()).toBeTruthy();
    expect(nonAdultUser.isAdult()).toBeFalsy();
  });


  test('should inform if user is admin properly', async () => {
    7;
    const userData = await makeSut();

    const adminUserId = new ObjectId().toString();
    const adminUser = new User(
      adminUserId,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      Role.create(UserRole.admin).getRight(),
      userData.birthday,
      userData.authentication
    );

    const nonAdminUserID = new ObjectId().toString();
    const nonAdminUser = new User(
      nonAdminUserID,
      userData.username,
      userData.name,
      userData.email,
      userData.cpf,
      userData.phone,
      Role.create(UserRole.driver).getRight(),
      userData.birthday,
      userData.authentication
    );

    expect(adminUser.isAdmin()).toBeTruthy();
    expect(nonAdminUser.isAdmin()).toBeFalsy();
  });

  // Add more tests as needed
});
