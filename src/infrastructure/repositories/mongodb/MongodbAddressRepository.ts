import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AddressRepository } from '../../../application/ports/AddressRepository';
import { AddressModel } from '../../models/mongodb/AddressModel';
import { AddressMapper } from '../../../mappers/AddressMapper';
import { Address } from '../../../domain/entities/Address';

export class MongodbAddressRepository implements AddressRepository {
  async findById(id: string): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const addressId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ _id: addressId });
    return AddressMapper.persistenceToModel(foundUser);
  }

  async findByUserId(id: string): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const userId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ userId });
    return AddressMapper.persistenceToModel(foundUser);
  }

  async findByEmail(email: string): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const foundUser = await addressCollection.findOne({ email });

    return AddressMapper.persistenceToModel(foundUser);
  }

  async create(address: Address): Promise<AddressModel | null> {
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

    if (createdAddress === null) {
      return null;
    }

    return AddressMapper.persistenceToModel(createdAddress);
  }

  async update(address: Address): Promise<AddressModel | null> {
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

    return AddressMapper.persistenceToModel(updatedAddress);
  }

  async delete(id: string): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const addreessId = new ObjectId(id);
    const deletedAddress = await addressCollection.findOneAndDelete({
      _id: addreessId,
    });

    if (deletedAddress === null) {
      return null;
    }

    return AddressMapper.persistenceToModel(deletedAddress);
  }
}
