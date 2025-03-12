import { Password } from "./password"

describe("Testing Password validator", () => {
  // VALID PASSWORD
    // At least 8 characters
    // A mix of uppercase and lowercase letters
    // At least one number
    // At least one special character
  test("Trying to create a valid password", () => {
    const validPassword = 'Drav@555@777@56';
    const passwordOrError = Password.create(validPassword);
    const gotPassword = passwordOrError.getRight();

    expect(passwordOrError.isRight()).toBeTruthy();
    expect(validPassword).toBe(gotPassword.get());
  });


  test("Trying to create password without simbols", () => {
    const validPassword = '55588558458Ab';
    const passwordOrError = Password.create(validPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without letters", () => {
    const validPassword = '55588558458#@';
    const passwordOrError = Password.create(validPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without numbers", () => {
    const validPassword = 'afksdfnisnfadn#@';
    const passwordOrError = Password.create(validPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without upercase letters", () => {
    const validPassword = '55588558458#a';
    const passwordOrError = Password.create(validPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without lower letters", () => {
    const validPassword = '55588558458#A';
    const passwordOrError = Password.create(validPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a password with more than 250 characteres", () => {
    let tooLongPassword = 'Drav@555@777@56';
    
    for (let i=0; i<256; i++) {
      tooLongPassword += '8';
    }

    const passwordOrError = Password.create(tooLongPassword);

    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a password with less than 8 characters", () => {
    let invalidPassword = 'nDra57@';

    const passwordOrError = Password.create(invalidPassword);

    expect(passwordOrError.isLeft()).toBeTruthy();
  });

})