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
    return AddressMapper.persistenceToAddressModel(foundUser);
  }

  async findByUserId(id: string): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const userId = new ObjectId(id);
    const foundUser = await addressCollection.findOne({ userId });
    return AddressMapper.persistenceToAddressModel(foundUser);
  }

  async findByEmail(email: string): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const foundUser = await addressCollection.findOne({ email });

    return AddressMapper.persistenceToAddressModel(foundUser);
  }

  async create(address: Address): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const AddressModel = AddressMapper.entityToAddressModel(address);
    const addressData = {
      ...AddressModel,
      _id: stringToObjectId(AddressModel._id),
    };

    const newAddressId = await addressCollection
      .insertOne(addressData)
      .then((result: any) => result.insertedId);

    const createdCustomer = await addressCollection.findOne({
      _id: newAddressId,
    });

    if (createdCustomer === null) {
      return null;
    }

    return AddressMapper.persistenceToAddressModel(createdCustomer);
  }

  async update(address: Address): Promise<AddressModel | null> {
    const addressCollection = mongoHelper.getCollection('addresses');
    const AddressModel = AddressMapper.entityToAddressModel(address);
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

    return AddressMapper.persistenceToAddressModel(updatedAddress);
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

    return AddressMapper.persistenceToAddressModel(deletedAddress);
  }
}
