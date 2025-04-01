import { SpyPaymentRepository } from "../spy-payment-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyPaymentRepository', () => {

  test('Should return all payments in the FAKE database', async () => {

    const spyPaymentRepository = new SpyPaymentRepository();

    const allPayments = await spyPaymentRepository.findAllPayments();
    
    expect(allPayments).toBeTruthy();
  });

  test('Should find a payment by id', async () => {

    const spyPaymentRepository = new SpyPaymentRepository();

    const paymentId = "123456789012345678901234"

    const foundPayment = await spyPaymentRepository.findPaymentById(paymentId);
    
    expect(spyPaymentRepository.findPaymentByIdParams.id).toEqual(paymentId);
    expect(foundPayment).toBeTruthy();
  });

  test('Should add a new', async () => {

    const spyPaymentRepository = new SpyPaymentRepository();

    const fakePayment = MockData.mockPayment();

    await spyPaymentRepository.add(fakePayment);

    const paymentInserted = spyPaymentRepository.addParams.payment;

    expect(paymentInserted.orderId)
      .toBe(fakePayment.orderId);
    expect(paymentInserted.paymentMethod)
      .toBe(fakePayment.paymentMethod);
    expect(paymentInserted.status)
      .toBe(fakePayment.status);
  });


  test('Should update payment by id', async () => {

    const spyPaymentRepository = new SpyPaymentRepository();

    const updatedData = {
      _id: null,
      orderId: 'orderid-updated',
      paymentMethod: 'payment-updated',
      status: 'paid',
    }

    const fakePaymentId = MockData.generateHexId();

    await spyPaymentRepository.update(fakePaymentId, updatedData);

    const updatedPaymentId = spyPaymentRepository.updateParams.paymentId
    const updatedPayment = spyPaymentRepository.updateParams.payment;

    expect(updatedPaymentId?.toString())
      .toBe(fakePaymentId);
    
    expect(updatedPayment?.orderId)
      .toBe(updatedData.orderId);
    expect(updatedPayment?.paymentMethod)
      .toBe(updatedData.paymentMethod);
    expect(updatedPayment?.status)
      .toBe(updatedData.status);
  });
  
  test('Should remove payment by id', async () => {

    const spyPaymentRepository = new SpyPaymentRepository();

    const fakePaymentId = MockData.generateHexId();

    await spyPaymentRepository.remove(fakePaymentId);

    const removedPaymentId = spyPaymentRepository.removeParams.paymentId;
    
    expect(removedPaymentId)
      .toBe(fakePaymentId);
  });

});