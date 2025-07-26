import { MongodbIdAdapter } from './MongodbIdAdapter';
import { ObjectId } from 'mongodb';

describe('Testing MongodbIdAdapter', () => {
  const idGenerator = new MongodbIdAdapter();

  test('Should generate a valid mongodb string Id', () => {
    let validId = true;
    try {
      const id = idGenerator.generate();
      new ObjectId(id);
    } catch (error) {
      validId = false;
    }

    expect(validId).toBeTruthy();
  });

  test('Should validate Ids properly', () => {
    const validId = new ObjectId().toString();
    const invalidId = 'invalidId';

    expect(idGenerator.validate(validId)).toBeTruthy();
    expect(idGenerator.validate(invalidId)).toBeFalsy();
  });
});
