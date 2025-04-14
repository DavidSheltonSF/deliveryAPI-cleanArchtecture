import { User as UserValidator } from "../../src/domain/entities/validators/entities_validators/user"
import { User } from "../../src/domain/entities/user";

const users: User[] = [
  {
    _id: null,
    username: 'João',
    email: 'joao@bugmail.com',
    phone: '21855475522',
    cpf: '55587748484',
    role: 'admin',
    address: {
      street: 'Rua dos Bobos',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345-678'
    },
    authentication: {
      password: 'Joao@2508',
    },
    bankInfo: {
      paymentMethod: 'credit_card',
      paymentInfo: {
        holderName: 'João',
        cardNumber: '1234567890123456',
        expiryDate: '12/23',
        cvv: '123'
      },
    }
  }
]


describe("Testing User validator", () => {
  test("Trying to create a valid complete user", () => {
    const validUser = users[0];
    const userOrError = UserValidator.create(validUser);
    //console.log(userOrError.getLeft());
    const gotUser = userOrError.getRight();

    expect(userOrError.isRight()).toBeTruthy();
    expect(validUser.username).toBe(gotUser.username.get());
    expect(validUser.email).toBe(gotUser.email.get());
    expect(validUser.phone).toBe(gotUser.phone.get());
    expect(validUser.cpf).toBe(gotUser.cpf.get());
    expect(validUser.role).toBe(gotUser.role.get());
    expect(validUser.address).toBe(gotUser.address.get());
  });

  test("Trying to create a valid user, but without address", () => {
    const validUser = { ...users[0] };
    validUser.address = undefined;
    const userOrError = UserValidator.create(validUser);
    //console.log(userOrError.getLeft());
    const gotUser = userOrError.getRight();

    expect(userOrError.isRight()).toBeTruthy();
    expect(validUser.username).toBe(gotUser.username.get());
    expect(validUser.email).toBe(gotUser.email.get());
    expect(validUser.phone).toBe(gotUser.phone.get());
    expect(validUser.cpf).toBe(gotUser.cpf.get());
    expect(validUser.role).toBe(gotUser.role.get());
  });

  test("Trying to create an user without user name", () => {
    const noUserNameUser = users[0];
    noUserNameUser.username = '';
    const userOrError = UserValidator.create(noUserNameUser);

    expect(userOrError.isLeft()).toBeTruthy();
  });

})