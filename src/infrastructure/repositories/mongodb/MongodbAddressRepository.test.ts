import { mongoHelper } from './helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbAddressRepository } from './MongodbAddressRepository';
import { AddressMapper } from '../../../mappers/AddressMapper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { ObjectId } from 'mongodb';
import { AddressZipCode } from '../../../domain/value-objects';
import  {entityCollectionMap} from './helpers/entityCollectionMap'

config();

describe('Testing MongodbAddressRepository', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI) {
      await mongoHelper.connect(MONGO_URI);
    } else {
      console.log('NO URI');
    }
  }, 60000);

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.clearCollection(entityCollectionMap.address);
  });

  async function makeSut() {
    const repository = new MongodbAddressRepository();
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const addressData = {
      street: 'Fake Street',
      city: 'Fake City',
      state: 'Fake State',
      zipCode: '25777789',
    };
    const addressPropsOrError = AddressMapper.rawToProps(addressData);
    const addressProps = addressPropsOrError.getRight();
    addressProps.userId = new ObjectId().toString();

    return {
      repository,
      addressProps,
      addressData,
      addressCollection,
    };
  }

  test('should create a new Address in the database', async () => {
    const { repository, addressProps, addressCollection } = await makeSut();
    const newAddress = await repository.create(addressProps);
    if (newAddress === null) {
      throw Error('Address not created');
    }
    const id = newAddress.id;
    const foundAddress = await addressCollection.findOne({
      _id: stringToObjectId(id),
    });

    expect(newAddress.street).toBe(foundAddress?.street);
    expect(newAddress.city).toBe(foundAddress?.city);
    expect(newAddress.state).toBe(foundAddress?.state);
    expect(newAddress.zipCode.getValue()).toBe(foundAddress?.zipCode);
  });

  test('should update an existing Address', async () => {
    const { addressCollection, repository } = await makeSut();

    const addressProps = {
      userId: new ObjectId().toString(),
      street: 'Fake Street',
      city: 'Fake City',
      state: 'Fake State',
      zipCode: AddressZipCode.createFromPersistence('25874789'),
      createdAt: new Date(),
    };

    const addressData = {
      userId: addressProps.userId,
      street: addressProps.street,
      city: addressProps.city,
      state: addressProps.state,
      zipCode: addressProps.zipCode,
      createdAt: addressProps.createdAt,
    };

    const addressObjectId = (await addressCollection.insertOne(addressData))
      .insertedId;
    
    const id = addressObjectId.toString().toString();

    const foundAddress = await addressCollection.findOne({ _id: addressObjectId });

    if (foundAddress === null) {
      throw Error('Address not found');
    }

    const street = 'Updated Street';
    const state = 'Updated State';

    const updatedAddresProps = {
      ...addressProps,
      street,
      state,
    }

    await repository.update(id, updatedAddresProps);

    const updatedAddress = await addressCollection.findOne({
      _id: addressObjectId});

    expect(updatedAddress?._id.toString()).toBe(id);
    expect(updatedAddress?.street).toBe(street);
    expect(updatedAddress?.state).toBe(state);
  });

  test('should delete an existing Address', async () => {
     const { addressCollection, repository } = await makeSut();

     const addressData = {
       userId: new ObjectId(),
       street: 'Fake Street',
       city: 'Fake City',
       state: 'Fake State',
       zipCode: '25777789',
       createdAt: new Date(),
     };

     const newAddressId = (await addressCollection.insertOne(addressData))
       .insertedId;

     const foundAddress = await addressCollection.findOne({
       _id: newAddressId,
     });

     if (foundAddress === null) {
       throw Error('Address not found');
     }

     const deletedAddress = await repository.delete(newAddressId.toString());

     const findDeletedAddress = await addressCollection.findOne({
       _id: newAddressId,
     });

    expect(deletedAddress?.id.toString()).toBe(newAddressId.toString());
    expect(findDeletedAddress).toBeFalsy();
  });

  test('should find an address by id', async () => {
    const { addressCollection, repository } = await makeSut();

    const addressData = {
      userId: new ObjectId(),
      street: 'Fake Street',
      city: 'Fake City',
      state: 'Fake State',
      zipCode: '25777789',
      createdAt: new Date(),
    };

    const newAddressId = (await addressCollection.insertOne(addressData))
      .insertedId;

    const foundAddress = await repository.findById(newAddressId.toString());

    expect(foundAddress?.id).toBe(newAddressId.toString());
    expect(foundAddress?.userId).toBe(addressData.userId.toString());
    expect(foundAddress?.street).toBe(addressData.street);
    expect(foundAddress?.city).toBe(addressData.city);
    expect(foundAddress?.state).toBe(addressData.state);
    expect(foundAddress?.zipCode.getValue()).toBe(addressData.zipCode);
  });

  test('should find an address by user id', async () => {
    const { addressCollection, repository } = await makeSut();

    const addressData = {
      userId: new ObjectId(),
      street: 'Fake Street',
      city: 'Fake City',
      state: 'Fake State',
      zipCode: '25777789',
      createdAt: new Date(),
    };

    const newAddressId = (await addressCollection.insertOne(addressData))
      .insertedId;

    const userId = addressData.userId.toString()
    const foundAddress = await repository.findByUserId(userId);

    expect(foundAddress?.id).toBe(newAddressId.toString());
    expect(foundAddress?.userId).toBe(addressData.userId.toString());
    expect(foundAddress?.street).toBe(addressData.street);
    expect(foundAddress?.city).toBe(addressData.city);
    expect(foundAddress?.state).toBe(addressData.state);
    expect(foundAddress?.zipCode.getValue()).toBe(addressData.zipCode);
  });
});
