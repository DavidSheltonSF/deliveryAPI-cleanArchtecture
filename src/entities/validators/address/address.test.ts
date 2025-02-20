import { Address } from "./address"

const validAddresses = [
  {
    street: "Rua Fictícia Ramos",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    zipCode: "85426-854"
  },
  {
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
      street: "Rua Fictícia Ramos",
      city: "",
      state: "Rio de Janeiro",
      zipCode: "28554-460"
    };
    const addressOrError = Address.create(invalidAddress);

    expect(addressOrError.isLeft()).toBeTruthy();
  });

})