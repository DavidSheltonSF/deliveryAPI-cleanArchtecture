import { User } from "../../src/domain/entities/validation";
import { UserProps } from "../../src/domain/entities/user-props";

const users: UserProps[] = [
  {
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
    const userOrError = User.createFull(validUser);
    //console.log(userOrError.getLeft());
    const gotUser = userOrError.getRight();

    console.log(gotUser.address.get())

    expect(userOrError.isRight()).toBeTruthy();
    expect(validUser.username).toBe(gotUser.username.get());
    expect(validUser.email).toBe(gotUser.email.get());
    expect(validUser.phone).toBe(gotUser.phone.get());
    expect(validUser.cpf).toBe(gotUser.cpf.get());
    expect(validUser.role).toBe(gotUser.role.get());
    expect(validUser.address).toBe(gotUser.address.get());
  });

  test("Trying to create a valid user, but without address", () => {
    const {address, ...validUser} = users[0];
    const userOrError = User.createFull(validUser);
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
    const userOrError = User.createFull(noUserNameUser);

    expect(userOrError.isLeft()).toBeTruthy();
  });

  // User.createPartial() ------------------------------

  test("Trying to create a valid user, but without name", () => {
    const {username, ...validUser} = users[0];
    const userOrError = User.createPartial(validUser);
    //console.log(userOrError.getLeft());
    const gotUser = userOrError.getRight();

    expect(userOrError.isRight()).toBeTruthy();
    expect(validUser.email).toBe(gotUser.email.get());
    expect(validUser.phone).toBe(gotUser.phone.get());
    expect(validUser.cpf).toBe(gotUser.cpf.get());
    expect(validUser.role).toBe(gotUser.role.get());
  });

  test("Trying to create a user providing only the username", () => {
    const validUser = {
      username: "newUser"
    }
    const userOrError = User.createPartial(validUser);
    //console.log(userOrError.getLeft());
    const gotUser = userOrError.getRight();

    expect(userOrError.isRight()).toBeTruthy();
    expect(validUser.username).toBe(gotUser.username.get());
  });

})