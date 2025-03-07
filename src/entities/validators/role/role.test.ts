import { Role } from "./role"

const validRoles = [
  'admin',
  'customer',
  'restaurant', 
  'restaurant_admin',
  'restaurant_chain_admin',
  'driver'
]

describe("Testing Role validator", () => {
  test("Trying to create a valid roles", () => {
    const validRole = validRoles[0];
    const roleOrError = Role.create(validRole);
    const gotRole = roleOrError.getRight();

    expect(roleOrError.isRight()).toBeTruthy();
    expect(validRole).toBe(gotRole.get());
  });

  test("Trying to create an invalid role", () => {
    const invalidRole = 'invalidRole';
    const roleOrError = Role.create(invalidRole);

    expect(roleOrError.isLeft()).toBeTruthy();
  });

})