import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AddressRepository } from '../../../application/ports/AddressRepository';
import { AddressMapper } from '../../../mappers/AddressMapper';
import { Address } from '../../../domain/entities/Address';

export class MongodbAddressRepository implements AddressRepository {
  async findById(id: string): Promise<Address | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const addressId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ _id: addressId });
    return Address.createFromPersistence({
      _id: foundUser._id.toString(),
      userId: foundUser.userId.toString(),
      street: foundUser.street,
      city: foundUser.city,
      state: foundUser.state,
      zipCode: foundUser.zipCode,
      createdAt: foundUser.createdAt,
    });
  }

  async findByUserId(id: string): Promise<Address | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const userId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ userId });
    return Address.createFromPersistence({
      _id: foundUser._id.toString(),
      userId: foundUser.userId.toString(),
      street: foundUser.street,
      city: foundUser.city,
      state: foundUser.state,
      zipCode: foundUser.zipCode,
      createdAt: foundUser.createdAt,
    });
  }

  async findByEmail(email: string): Promise<Address | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const foundUser = await addressCollection.findOne({ email });
    return Address.createFromPersistence({
      _id: foundUser._id.toString(),
      userId: foundUser.userId.toString(),
      street: foundUser.street,
      city: foundUser.city,
      state: foundUser.state,
      zipCode: foundUser.zipCode,
      createdAt: foundUser.createdAt,
    });
  }

  async create(address: Address): Promise<Address | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const AddressModel = AddressMapper.entityToModel(address);
    const addressData = {
      ...AddressModel,
      _id: stringToObjectId(AddressModel._id),
    };

    const newAddressId = await addressCollection
      .insertOne(addressData)
      .then((result: any) => result.insertedId);

    const createdAddress = await addressCollection.findOne({
      _id: newAddressId,
    });

    console.log(createdAddress)

    if (createdAddress === null) {
      return null;
    }

    return Address.createFromPersistence({
      _id: createdAddress._id.toString(),
      userId: createdAddress.userId.toString(),
      street: createdAddress.street,
      city: createdAddress.city,
      state: createdAddress.state,
      zipCode: createdAddress.zipCode,
      createdAt: createdAddress.createdAt,
    });
  }

  async update(address: Address): Promise<Address | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const AddressModel = AddressMapper.entityToModel(address);
    const addreessId = AddressModel._id;
    delete AddressModel._id;
    const updatedAddress = await addressCollection.findOneAndUpdate(
      { _id: stringToObjectId(addreessId) },
      { $set: AddressModel },
      { returnDocument: 'after' }
    );

    if (updatedAddress === null) {
      return null;
    }

    return Address.createFromPersistence({
      _id: updatedAddress._id.toString(),
      userId: updatedAddress.userId.toString(),
      street: updatedAddress.street,
      city: updatedAddress.city,
      state: updatedAddress.state,
      zipCode: updatedAddress.zipCode,
      createdAt: updatedAddress.createdAt,
    });
  }

  async delete(id: string): Promise<Address | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const addreessId = new ObjectId(id);
    const deletedAddress = await addressCollection.findOneAndDelete({
      _id: addreessId,
    });

    if (deletedAddress === null) {
      return null;
    }

    return Address.createFromPersistence({
      _id: deletedAddress._id.toString(),
      userId: deletedAddress.userId.toString(),
      street: deletedAddress.street,
      city: deletedAddress.city,
      state: deletedAddress.state,
      zipCode: deletedAddress.zipCode,
      createdAt: deletedAddress.createdAt,
    });
  }
}
