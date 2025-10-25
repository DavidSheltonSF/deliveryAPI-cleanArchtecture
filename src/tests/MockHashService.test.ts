import {MockHashService} from './MockHashService'

describe('Testing MoackHashService', () => {
  const hasher = new MockHashService();

  test('Should simulate a hashing operation properly', async () => {
    const rawString = 'myPassword';
    const expectedHash = rawString + '-hashed'

    const hashed = await hasher.hash(rawString);
    expect(hashed).toBe(expectedHash);
  });

  test('Should compare raw and hashed data properly', async () => {
    const rawString = 'myPassword';
    const rightHash = rawString + '-hashed';
    const wrongHash = 'fdfdafsdf'

    const rightHashResult = await hasher.compare(rawString, rightHash);
    const wrongHashResult = await hasher.compare(rawString, wrongHash);
    expect(rightHashResult).toBeTruthy();
    expect(wrongHashResult).toBeFalsy();
  });
  
})