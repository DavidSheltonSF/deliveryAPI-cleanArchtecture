import { SpyCustomerRepository } from "../spy-customer-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyCustomerRepository', () => {


  test('Should add a new', async () => {

    const spyCustomerRepository = new SpyCustomerRepository();

    const [mokedCustomer] = MockData.mockCustomerDTO();

    await spyCustomerRepository.add(mokedCustomer);

    const customerInserted = spyCustomerRepository.addParams.newCustomer;
    
    expect(customerInserted?.customername)
      .toBe(mokedCustomer.username);
    expect(customerInserted?.email)
      .toBe(mokedCustomer.email);
    expect(customerInserted?.cpf)
      .toBe(mokedCustomer.cpf);
    expect(customerInserted?.phone)
      .toBe(mokedCustomer.phone);
    expect(customerInserted?.address?.street)
      .toBe(mokedCustomer.address?.street);
    expect(customerInserted?.address?.city)
      .toBe(mokedCustomer.address?.city);
    expect(customerInserted?.address?.state)
      .toBe(mokedCustomer.address?.state);
    expect(customerInserted?.address?.zipCode)
      .toBe(mokedCustomer.address?.zipCode);
    expect(customerInserted?.authentication?.password)
      .toBe(mokedCustomer.authentication.password);
  });

});