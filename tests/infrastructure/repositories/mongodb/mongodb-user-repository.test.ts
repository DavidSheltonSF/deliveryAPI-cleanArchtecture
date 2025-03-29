import { mongoHelper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbUserRepository } from "../../../../src/infrastructure/repositories/mongodb/mongodb-user-repository";

config();

const repository = new MongodbUserRepository();

const users = [
  {
    _id: mongoHelper.toObjectId('60f1b9b3b3b3b3b3b3b3b3b3'),
    username: 'Marta',
    email: 'mart@bugmail.com',
    cpf: '88888888888',
    phone: '21555777777',
    role: 'admin',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22222220'
    },
    authentication: {
      password: 'dfasfsdfasfsdf'
    },
  },
  {
    _id: mongoHelper.toObjectId('60f1b9b3b3b3b3b3b3b3b3c3'),
    username: 'Oswaldo',
    email: 'oswald@bugmail.com',
    cpf: '88888888588',
    phone: '21558777777',
    role: 'restaurant_admin',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22224420'
    },
    authentication: {
      password: 'dfasfsdfasfsdf'
    },
  },
]

describe('Testing MongodbUserRepository', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI){
      await mongoHelper.connect(MONGO_URI);
      
    } else {
      console.log('NO URI');
    }
      
  }, 60000);
  
  afterAll(async () => {
    await mongoHelper.disconnect();

  });

  
  beforeEach(async () => {
    await mongoHelper.clearCollection('users');
  });

  test('Should add a new user in the database', async () => {

    const userCollection = mongoHelper.getCollection('users');

    // Adding new users to database
    await repository.add(users[0]);

    const foundUser = await userCollection.findOne({email: users[0].email})
    
    expect(foundUser?.username)
      .toBe(users[0].username);
    expect(foundUser?.email)
      .toBe(users[0].email);
    expect(foundUser?.cpf)
      .toBe(users[0].cpf);
    expect(foundUser?.phone)
      .toBe(users[0].phone);
    expect(foundUser?.role)
      .toBe(users[0].role);

    const {_id, ...addressWithoutId} = foundUser?.address
    expect(JSON.stringify(addressWithoutId))
      .toBe(JSON.stringify(users[0].address));
  });

  test('Should return all users in the database', async () => {

    const userCollection = mongoHelper.getCollection('users');

    // Adding new users to database
    await userCollection.insertOne(users[0]);
    await userCollection.insertOne(users[1]);

    const allUsers = await repository.findAllUsers();
    
    expect(allUsers[0].username).toEqual(users[0].username);
    expect(allUsers[1].username).toEqual(users[1].username);
  });

  test('Should find a user by id', async () => {

    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(users[0]);

    const foundUser = await repository.findUserById(users[0]._id.toString());

    expect(foundUser?.username)
      .toBe(users[0].username);
    expect(foundUser?.email)
      .toBe(users[0].email);
    expect(foundUser?.cpf)
      .toBe(users[0].cpf);
    expect(foundUser?.phone)
      .toBe(users[0].phone);
    expect(foundUser?.role)
      .toBe(users[0].role);
  });

  test('Should find a user by email', async () => {

    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(users[0]);

    const foundUser = await repository.findUserByEmail(users[0].email);

    expect(foundUser?.username)
      .toBe(users[0].username);
    expect(foundUser?.email)
      .toBe(users[0].email);
    expect(foundUser?.cpf)
      .toBe(users[0].cpf);
    expect(foundUser?.phone)
      .toBe(users[0].phone);
    expect(foundUser?.role)
      .toBe(users[0].role);
  });

  test('Should update user by id', async () => {
    
    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(users[0]);

    const updatedUser = {
      username: 'Marta-updated',
      email: 'mart@bugmail.com-updated',
      cpf: '88888888888-updated',
      phone: '21555777777-updated',
      role: 'admin-updated',
      address: {
        street: 'test streed-updated',
        city: 'Belford Roxo-updated',
        state: 'Rio de Janeiro-updated',
        zipCode: '22222220-updated'
      },
      authentication: {
        password: 'dfasfsdfasfsdf-updated'
      },
    }

    await repository.update(users[0]._id.toString(), updatedUser);

    const foundUser = await repository.findUserById(users[0]._id.toString());

    expect(foundUser?.username)
      .toBe(updatedUser.username);
    expect(foundUser?.email)
      .toBe(updatedUser.email);
    expect(foundUser?.cpf)
      .toBe(updatedUser.cpf);
    expect(foundUser?.phone)
      .toBe(updatedUser.phone);
    expect(foundUser?.role)
      .toBe(updatedUser.role);

  });

  test('Should remove user by id', async () => {
    
    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(users[0]);

    await repository.remove(users[0]._id.toString());

    const foundUser = await repository.findUserById(users[0]._id.toString());

    expect(foundUser)
      .toBeFalsy();
  });
  
})