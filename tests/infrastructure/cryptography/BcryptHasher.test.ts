import bcrypt from 'bcryptjs';
import { BcryptHasher } from '../../../src/infrastructure/cryptography/BcryptHasher';


describe('Testing CustomerPropsMapper', () => {
  
  test('Should hash a raw password', async () => {

  const hasher = new BcryptHasher(12);
    
  const rawPassword = "Test123*/**@1";

  const hashedPassword = await hasher.hash(rawPassword)

  expect(bcrypt.compare(rawPassword, hashedPassword)).toBeTruthy();
  });

  test('Should compare correctly a raw password and a hashed one', async () => {
    const hasher = new BcryptHasher(12);

    const rawPassword = 'Test123*/**@1';

    const hashedPassword = await bcrypt.hash(rawPassword, 12);

    expect(hasher.compare(rawPassword, hashedPassword)).toBeTruthy();
  });
});
