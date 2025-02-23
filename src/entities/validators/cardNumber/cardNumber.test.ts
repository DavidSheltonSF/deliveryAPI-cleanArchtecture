import { CardNumber } from "./cardNumber"

describe("Testing CardNumber validator", () => {
  test("Trying to create a valid cardnumber", () => {
    const validCardNumber = '5555 5555 5555 5555';
    const cardnumberOrError = CardNumber.create(validCardNumber);
    const gotCardNumber = cardnumberOrError.getRight();

    expect(cardnumberOrError.isRight()).toBeTruthy();
    expect(validCardNumber).toBe(gotCardNumber.get());
  });


  test("Trying to create cardnumber letters", () => {
    const validCardNumber = '5555 5a55 c5a5 5555';
    const cardnumberOrError = CardNumber.create(validCardNumber);
    
    expect(cardnumberOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create cardnumber with special characters", () => {
    const validCardNumber = '5555 5#55 22)5 5555';
    const cardnumberOrError = CardNumber.create(validCardNumber);
    
    expect(cardnumberOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a cardnumber with less than 16 digits", () => {
    const validCardNumber = '5555 5555 5555 555';
    const cardnumberOrError = CardNumber.create(validCardNumber);
    
    expect(cardnumberOrError.isLeft()).toBeTruthy();
  });

  test("Trying to create a cardnumber with more than 16 digits", () => {
    const validCardNumber = '5555 5555 5555 55555';
    const cardnumberOrError = CardNumber.create(validCardNumber);
    
    expect(cardnumberOrError.isLeft()).toBeTruthy();
  });

})