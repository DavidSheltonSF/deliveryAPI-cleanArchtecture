import { Email } from "../../src/domain/entities/validators/fields_validators/email"

describe("Testing Email validator", () => {
  test("Trying to create a valid email", () => {
    const validEmail = 'maria@bugmail.com';
    const emailOrError = Email.create(validEmail);
    const gotEmail = emailOrError.getRight();

    expect(emailOrError.isRight()).toBeTruthy();
    expect(validEmail).toBe(gotEmail.get());
  });


  test("Trying to create email without @", () => {
    const invalidEmail = 'mariabugmail.com';
    const emailOrError = Email.create(invalidEmail);

    expect(emailOrError.isLeft()).toBeTruthy();
  });


  test("Trying to create a email with more than 255 characteres", () => {
    let tooLongEmail = '';
    
    for (let i=0; i<256; i++) {
      tooLongEmail += 'N';
    }

    tooLongEmail += '@bugmail.com';

    const emailOrError = Email.create(tooLongEmail);

    expect(emailOrError.isLeft()).toBeTruthy();
  });
})