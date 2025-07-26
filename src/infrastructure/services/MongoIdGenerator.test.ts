import { MongoIdGenerator } from './MongoIdGenerator';
import { ObjectId } from 'mongodb';

describe('Testing MongoIdGenerator', () => {
  const idGenerator = new MongoIdGenerator();

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
