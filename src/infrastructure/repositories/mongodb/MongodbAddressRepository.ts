import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AddressRepository } from '../../../application/ports/AddressRepository';
import { AddressMapper } from '../../../mappers/AddressMapper';
import { AddressFactory } from '../../../factories/AddressFactory';
import { AddressProps } from '../../../domain/entities/props/AddressProps';
import { WithId } from '../../../utils/types/WithId';
import { entityCollectionMap } from './helpers/entityCollectionMap';


export class MongodbAddressRepository implements AddressRepository {
  async findById(id: string): Promise<WithId<AddressProps> | null> {
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const addressId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ _id: addressId });
    return AddressFactory.createFromPersistence({
      id: foundUser._id.toString(),
      userId: foundUser.userId.toString(),
      street: foundUser.street,
      city: foundUser.city,
      state: foundUser.state,
      zipCode: foundUser.zipCode,
      createdAt: foundUser.createdAt,
    });
  }

  async findByUserId(id: string): Promise<WithId<AddressProps> | null> {
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const userId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ userId });
    return AddressFactory.createFromPersistence({
      id: foundUser._id.toString(),
      userId: foundUser.userId.toString(),
      street: foundUser.street,
      city: foundUser.city,
      state: foundUser.state,
      zipCode: foundUser.zipCode,
      createdAt: foundUser.createdAt,
    });
  }

  async findByEmail(email: string): Promise<WithId<AddressProps> | null> {
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const foundUser = await addressCollection.findOne({ email });
    return AddressFactory.createFromPersistence({
      id: foundUser._id.toString(),
      userId: foundUser.userId.toString(),
      street: foundUser.street,
      city: foundUser.city,
      state: foundUser.state,
      zipCode: foundUser.zipCode,
      createdAt: foundUser.createdAt,
    });
  }

  async create(
    address: AddressProps
  ): Promise<WithId<AddressProps> | null> {
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const AddressModel = AddressMapper.propsToPersistence(address);

    const newAddressId = await addressCollection
      .insertOne(AddressModel)
      .then((result: any) => result.insertedId);

    const createdAddress = await addressCollection.findOne({
      _id: newAddressId,
    });

    if (createdAddress === null) {
      return null;
    }

    return AddressFactory.createFromPersistence({
      id: createdAddress._id.toString(),
      userId: createdAddress.userId.toString(),
      street: createdAddress.street,
      city: createdAddress.city,
      state: createdAddress.state,
      zipCode: createdAddress.zipCode,
      createdAt: createdAddress.createdAt,
    });
  }

  async update(
    id: string,
    address: AddressProps
  ): Promise<WithId<AddressProps> | null> {
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const AddressModel = AddressMapper.propsToPersistence(address);
    const updatedAddress = await addressCollection.findOneAndUpdate(
      { _id: stringToObjectId(id) },
      { $set: AddressModel },
      { returnDocument: 'after' }
    );

    if (updatedAddress === null) {
      return null;
    }

    return AddressFactory.createFromPersistence({
      id: updatedAddress._id.toString(),
      userId: updatedAddress.userId.toString(),
      street: updatedAddress.street,
      city: updatedAddress.city,
      state: updatedAddress.state,
      zipCode: updatedAddress.zipCode,
      createdAt: updatedAddress.createdAt,
    });
  }

  async delete(id: string): Promise<WithId<AddressProps> | null> {
    const addressCollection = mongoHelper.getCollection(entityCollectionMap.address);
    const addreessId = new ObjectId(id);
    const deletedAddress = await addressCollection.findOneAndDelete({
      _id: addreessId,
    });

    if (deletedAddress === null) {
      return null;
    }

    return AddressFactory.createFromPersistence({
      id: deletedAddress._id.toString(),
      userId: deletedAddress.userId.toString(),
      street: deletedAddress.street,
      city: deletedAddress.city,
      state: deletedAddress.state,
      zipCode: deletedAddress.zipCode,
      createdAt: deletedAddress.createdAt,
    });
  }
}
