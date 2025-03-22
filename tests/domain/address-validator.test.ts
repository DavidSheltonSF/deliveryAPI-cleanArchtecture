import { Address } from "../../src/domain/entities/validators/fields_validators/address"

const validAddresses = [
  {
    ownerEntityId: "testId2432413",
    street: "Rua Fictícia Ramos",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    zipCode: "85426-854"
  },
  { 
    ownerEntityId: "testId24324SF",
    street: "Rua Fictícia Ramos",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    zipCode: "85426854"
  }
]

describe("Testing Address validator", () => {
  test("Trying to create a valid addresss", () => {
    const addressOrError = Address.create(validAddresses[0]);
    const gotAddress = addressOrError.getRight();

    expect(addressOrError.isRight()).toBeTruthy();
    expect(validAddresses[0]).toBe(gotAddress.get());
  });

  test("Trying to create a valid addresss with zipCode without '-'", () => {
    const addressOrError = Address.create(validAddresses[1]);
    const gotAddress = addressOrError.getRight();

    expect(addressOrError.isRight()).toBeTruthy();
    expect(validAddresses[1]).toBe(gotAddress.get());
  });

  test("Trying to create an address with invalid zipCode", () => {
    const invalidAddress = {
      ownerEntityId: "testId2432883",
      street: "Rua Fictícia Ramos",
      city: "Rio de Janeiro",
      state: "Rio de Janeiro",
      zipCode: "8542685@44"
    };
    const addressOrError = Address.create(invalidAddress);

    expect(addressOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create an address with some void field", () => {
    const invalidAddress = {
      ownerEntityId: "testId24324kk",
      street: "Rua Fictícia Ramos",
      city: "",
      state: "Rio de Janeiro",
      zipCode: "28554-460"
    };
    const addressOrError = Address.create(invalidAddress);

    expect(addressOrError.isLeft()).toBeTruthy();
  });

})