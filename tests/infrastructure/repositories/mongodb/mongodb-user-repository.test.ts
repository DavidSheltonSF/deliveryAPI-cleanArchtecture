import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbUserRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-user-repository';
import { MongodbMapper } from '../../../../src/infrastructure/repositories/mongodb/helpers/MongodbMapper';
import { generateHexId } from '../../../../src/shared/generateHexId';

config();

const repository = new MongodbUserRepository();

const userId0 = '5a071d9379964c1c8ed80efa';
const userId1 = generateHexId();

const users = [
  {
    id: userId0,
    username: 'Marta',
    email: 'mart@bugmail.com',
    cpf: '88888888888',
    phone: '21555777777',
    role: 'admin',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22222220',
    },
    authentication: {
      password: 'dfasfsdfasfsdf',
    },
  },
  {
    id: userId1,
    username: 'Oswaldo',
    email: 'oswald@bugmail.com',
    cpf: '88888888588',
    phone: '21558777777',
    role: 'restaurant_admin',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22224420',
    },
    authentication: {
      password: 'dfasfsdfasfsdf',
    },
  },
];

describe('Testing MongodbUserRepository', () => {
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
    await mongoHelper.clearCollection('users');
  });

  test('Should add a new user in the database', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const { id, ...userWithoudID } = users[0];

    // Adding new users to database
    await repository.add(userWithoudID);

    const foundUser = await userCollection.findOne({ email: userWithoudID.email });

    expect(foundUser?.username).toBe(userWithoudID.username);
    expect(foundUser?.email).toBe(userWithoudID.email);
    expect(foundUser?.cpf).toBe(userWithoudID.cpf);
    expect(foundUser?.phone).toBe(userWithoudID.phone);
    expect(foundUser?.role).toBe(userWithoudID.role);

  });

  test('Should return all users in the database', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const user0 = MongodbMapper.toMongodbDocument(users[0])
    const user1 = MongodbMapper.toMongodbDocument(users[1]);

    // Adding new users to database
    await userCollection.insertOne(user0);
    await userCollection.insertOne(user1);

    const allUsers = await repository.findAllUsers();

    expect(allUsers[0].username).toEqual(users[0].username);
    expect(allUsers[1].username).toEqual(users[1].username);
  });

  test('Should find a user by id', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const user = users[0]
    const userMogongoDocument = MongodbMapper.toMongodbDocument(user);

    // Adding new user to database
    await userCollection.insertOne(
      MongodbMapper.toMongodbDocument(userMogongoDocument)
    );

    const foundUser = await repository.findUserById(user.id);

    expect(foundUser?.username).toBe(user.username);
    expect(foundUser?.email).toBe(user.email);
    expect(foundUser?.cpf).toBe(user.cpf);
    expect(foundUser?.phone).toBe(user.phone);
    expect(foundUser?.role).toBe(user.role);
  });

  test('Should find a user by email', async () => {
    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(MongodbMapper.toMongodbDocument(users[0]));

    const foundUser = await repository.findUserByEmail(users[0].email);

    expect(foundUser?.username).toBe(users[0].username);
    expect(foundUser?.email).toBe(users[0].email);
    expect(foundUser?.cpf).toBe(users[0].cpf);
    expect(foundUser?.phone).toBe(users[0].phone);
    expect(foundUser?.role).toBe(users[0].role);
  });

  test('Should update user by id', async () => {
    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(MongodbMapper.toMongodbDocument(users[0]));

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
        zipCode: '22222220-updated',
      },
      authentication: {
        password: 'dfasfsdfasfsdf-updated',
      },
    };

    await repository.update(users[0].id, updatedUser);

    const foundUser = await repository.findUserById(users[0].id);

    expect(foundUser?.username).toBe(updatedUser.username);
    expect(foundUser?.email).toBe(updatedUser.email);
    expect(foundUser?.cpf).toBe(updatedUser.cpf);
    expect(foundUser?.phone).toBe(updatedUser.phone);
    expect(foundUser?.role).toBe(updatedUser.role);
  });

  test('Should remove user by id', async () => {
    const userCollection = mongoHelper.getCollection('users');

    // Adding new user to database
    await userCollection.insertOne(MongodbMapper.toMongodbDocument(users[0]));

    await repository.remove(users[0].id.toString());

    const foundUser = await repository.findUserById(users[0].id.toString());

    expect(foundUser).toBeFalsy();
  });
});
