import { Authentication } from "../../src/domain/entities/validators/fields_validators/authentication/authentication"

describe("Testing Password validator", () => {
  // VALID PASSWORD
    // At least 8 characters
    // A mix of uppercase and lowercase letters
    // At least one number
    // At least one special character
  test("Trying to create a valid password", () => {
    const authWithValidPassword = { password: 'Drav@555@777@56' };
    const AuthenticationOrError = Authentication.create(authWithValidPassword);
    const gotPassword = AuthenticationOrError.getRight().get().password;

    expect(AuthenticationOrError.isRight()).toBeTruthy();
    expect(authWithValidPassword.password).toBe(gotPassword);
  });


  test("Trying to create password without simbols", () => {
    const authWithInvalidPassword = { password: '55588558458Ab' };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without letters", () => {
    const authWithInvalidPassword = { password: '55588558458#5' };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without numbers", () => {
    const authWithInvalidPassword = { password: 'abjskjss#fdagg' };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without upercase letters", () => {
    const authWithInvalidPassword = { password: '555v855a58#5' };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create password without lower letters", () => {
    const authWithInvalidPassword = { password: '55588AB8458#5' };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a password with more than 250 characteres", () => {
    let tooLongPassword = 'Drav@555@777@56';
    
    for (let i=0; i<256; i++) {
      tooLongPassword += '8';
    }

    const authWithInvalidPassword = { password: tooLongPassword };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a password with less than 8 characters", () => {
    const authWithInvalidPassword = { password: 'SG#ASS' };
    const passwordOrError = Authentication.create(authWithInvalidPassword);
    
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

})