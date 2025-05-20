import { ID } from "../../src/domain/entities/validation";
import { MockData } from "../_helpers/mockData";

describe("Testing ID validator", () => {
  test("Should create a ID succesfully", () => {
    const validID = MockData.generateHexId();
    const IDOrError = ID.create(validID);
    const gotID = IDOrError.getRight();

    expect(IDOrError.isRight()).toBeTruthy();
    expect(validID).toBe(gotID.get());
  });


  test("Should return an error when trying to create invalid ID", () => {
    const invalidID = "invalidId";
    const IDOrError = ID.create(invalidID);

    expect(IDOrError.isLeft()).toBeTruthy();
  });

  
})