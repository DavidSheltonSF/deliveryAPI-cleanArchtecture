import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbPaymentRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-payment-repository';
import { generateHexId } from '../../../../src/shared/generateHexId';
import { MongodbMapper } from '../../../../src/infrastructure/repositories/mongodb/helpers/MongodbMapper';

config();

const repository = new MongodbPaymentRepository();

const orderId0 = generateHexId();
const orderId1 = generateHexId();

const payments = [
  {
    id: generateHexId(),
    orderId: orderId0,
    paymentMethod: 'credit_card',
    status: 'paid',
  },
  {
    id: generateHexId(),
    orderId: orderId1,
    paymentMethod: 'pix_key',
    status: 'pending',
  },
];

describe('Testing MongodbPaymentRepository', () => {
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
    await mongoHelper.clearCollection('payment');
  });

  test('Should add a new Payment in the database', async () => {
    const PaymentCollection = mongoHelper.getCollection('payment');

    // Adding new payments to database
    await repository.add(payments[0]);

    const foundPayment = await PaymentCollection.findOne({
      orderId: payments[0].orderId,
    });

    expect(foundPayment?.orderId).toBe(payments[0].orderId);
    expect(foundPayment?.paymentMethod).toBe(payments[0].paymentMethod);
    expect(foundPayment?.status).toBe(payments[0].status);
  });

  test('Should return all payments in the database', async () => {
    const PaymentCollection = mongoHelper.getCollection('payment');

    // Adding new payments to database
    await PaymentCollection.insertOne(
      MongodbMapper.toMongodbDocument(payments[0])
    );
    await PaymentCollection.insertOne(
      MongodbMapper.toMongodbDocument(payments[1])
    );

    const allpayments = await repository.findAllPayments();

    expect(allpayments[0].orderId).toEqual(payments[0].orderId);
    expect(allpayments[1].orderId).toEqual(payments[1].orderId);
  });

  test('Should find a Payment by id', async () => {
    const PaymentCollection = mongoHelper.getCollection('payment');

    // Adding new Payment to database
    await PaymentCollection.insertOne(
      MongodbMapper.toMongodbDocument(payments[0])
    );

    const foundPayment = await repository.findPaymentById(
      payments[0].id.toString()
    );

    expect(foundPayment?.orderId).toBe(payments[0].orderId);
    expect(foundPayment?.paymentMethod).toBe(payments[0].paymentMethod);
    expect(foundPayment?.status).toBe(payments[0].status);
  });

  test('Should update Payment by id', async () => {
    const PaymentCollection = mongoHelper.getCollection('payment');

    // Adding new Payment to database
    await PaymentCollection.insertOne(
      MongodbMapper.toMongodbDocument(payments[0])
    );

    const updatedOrderId = generateHexId();
    const updatedPayment = {
      orderId: updatedOrderId,
      paymentMethod: 'credit_card-updated',
      status: 'paid-updated',
    };

    await repository.update(payments[0].id.toString(), updatedPayment);

    const foundPayment = await repository.findPaymentById(
      payments[0].id.toString()
    );

    expect(foundPayment?.orderId).toBe(updatedPayment.orderId);
    expect(foundPayment?.paymentMethod).toBe(updatedPayment.paymentMethod);
    expect(foundPayment?.status).toBe(updatedPayment.status);
  });

  test('Should remove Payment by id', async () => {
    const PaymentCollection = mongoHelper.getCollection('payment');

    // Adding new Payment to database
    await PaymentCollection.insertOne(
      MongodbMapper.toMongodbDocument(payments[0])
    );

    await repository.remove(payments[0].id.toString());

    const foundPayment = await repository.findPaymentById(
      payments[0].id.toString()
    );

    expect(foundPayment).toBeFalsy();
  });
});
