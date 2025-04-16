import { BankInfoValidator } from "../../src/domain/entities/validators/fields_validators/bankInfoValidator"

const validbankInfos = [
  {
    paymentMethod: "credit_card",
    paymentInfo: {
      holderName: "John Doe",
      cardNumber: "1234 5678 9012 3456",
      cvv: "123",
      expirationDate: "12/25",
    }
  },
  {
    paymentMethod: "bank_transfer",
    paymentInfo: {
      holderName: "Carlos Silva",
      bankAccount: {
        bankName: "Banco do Brasil",
        accountNumber: "123456789",
      }
    }
  },
]

describe("Testing bankInfo validator", () => {
  test("Trying to create a valid bankInfos with credit_card as payment method", () => {
    const bankInfoOrError = BankInfoValidator.create(validbankInfos[0]);
    const gotbankInfo = bankInfoOrError.getRight();

    expect(bankInfoOrError.isRight()).toBeTruthy();
    expect(validbankInfos[0]).toBe(gotbankInfo.get());
  });

  test("Trying to create a valid bankInfos with bank_transfer as payment method", () => {
    const bankInfoOrError = BankInfoValidator.create(validbankInfos[1]);
    const gotbankInfo = bankInfoOrError.getRight();

    expect(bankInfoOrError.isRight()).toBeTruthy();
    expect(validbankInfos[1]).toBe(gotbankInfo.get());
  });


  test("Trying to create an bankInfo with invalid cardNumber", () => {
    const invalidbankInfo = {
      paymentMethod: "credit_card",
      paymentInfo: {
        holderName: "John Doe",
        cardNumber: "1234 5678 9012 345", // Invalid card number
        cvv: "123",
        expirationDate: "12/25",
      }
    };
    const bankInfoOrError = BankInfoValidator.create(invalidbankInfo);

    expect(bankInfoOrError.isLeft()).toBeTruthy();
  });

})