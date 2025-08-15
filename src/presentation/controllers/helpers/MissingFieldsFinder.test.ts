import { MissingFieldsFinder } from './MissingFieldsFinder';
import { requiredFields } from './requiredFields';

describe('Testing MissingFieldsFinder', () => {
  test('should find all missing customer fields', () => {
    const requiredFieldsCount = requiredFields.customer.length;
    const requiredFieldsProvided = {
      count: 2,
      data: {
        firstName: 'José',
        lastName: 'Carlo',
      },
    };

    const { data } = requiredFieldsProvided;
    const missingFields = MissingFieldsFinder.checkCustomerFields(data);

    expect(missingFields.length + requiredFieldsProvided.count).toBe(
      requiredFieldsCount
    );
  });

  test('should find all missing address fields', () => {
    const requiredFieldsCount = requiredFields.address.length;
    const requiredFieldsProvided = {
      count: 2,
      data: {
        street: 'Fake  street',
        state: 'Monte State',
      },
    };

    const { data } = requiredFieldsProvided;
    const missingFields = MissingFieldsFinder.checkAddressFields(data);

    expect(missingFields.length + requiredFieldsProvided.count).toBe(
      requiredFieldsCount
    );
  });

  test('should find all missing authentication fields', () => {
    const requiredFieldsCount = requiredFields.authentication.length;
    const requiredFieldsProvided = {
      length: 0,
      data: {
        sessionToken: 'fdafskgnasjdgfajsbngfag', //it's not a required field
      },
    };

    const { data } = requiredFieldsProvided;
    const missingFields = MissingFieldsFinder.checkAuthenticationFields(data);

    expect(missingFields.length + requiredFieldsProvided.length).toBe(
      requiredFieldsCount
    );
  });

  test('should find all missing fields in createCustomer request', () => {
    const requiredFieldsCount =
      requiredFields.customer.length +
      requiredFields.address.length +
      requiredFields.authentication.length;

    const requiredFieldsProvided = {
      length: 2,
      request: {
        body: {
          firstName: 'Joares',
          birthday: '2000-01-01',
        },
      },
    };

    const { request } = requiredFieldsProvided;
    const missingFields =
      MissingFieldsFinder.checkCreateCustomerRequestFields(request);

    expect(missingFields.length + requiredFieldsProvided.length).toBe(
      requiredFieldsCount
    );
  });
});
