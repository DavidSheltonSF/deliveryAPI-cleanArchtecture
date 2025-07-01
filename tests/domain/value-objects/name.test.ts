import { Name } from "../../../src/domain/value-objects"

describe("Testing Name validator", () => {
  test("Trying to create a valid name", () => {
    const validName = 'Maria Sílva de Oliveira';
    const nameOrError = Name.create(validName);
    const gotName = nameOrError.getRight();

    expect(nameOrError.isRight()).toBeTruthy();
    expect(validName).toBe(gotName.get());
  });

  test("Trying to create a valid name with only 2 characteres", () => {
    const validName = 'Ví';
    const nameOrError = Name.create(validName);
    const gotName = nameOrError.getRight();

    expect(nameOrError.isRight()).toBeTruthy();
    expect(validName).toBe(gotName.get());
  });

  test("Trying to create name with special characteres", () => {
    const invalidName = 'Maria@ Síl$$$va de Oliveira';
    const nameOrError = Name.create(invalidName);

    expect(nameOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create name with numbers", () => {
    const invalidName = 'Maria 22';
    const nameOrError = Name.create(invalidName);

    expect(nameOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a name with less than 2 characteres", () => {
    const tooShortName = 'D';
    const nameOrError = Name.create(tooShortName);

    expect(nameOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a name with more than 255 characteres", () => {
    let tooLongName = '';
    for (let i=0; i<256; i++) {
      tooLongName += 'N';
    }
    const nameOrError = Name.create(tooLongName);

    expect(nameOrError.isLeft()).toBeTruthy();
  });
})