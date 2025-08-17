import { findMissingFields } from '../../../utils/findMissingFields';
import { HttpRequest } from '../../_ports/http';
import { requiredFields } from './requiredFields';

export class MissingFieldsFinder {
  static checkCustomerFields(data: Record<string, any>): Array<string> {
    return findMissingFields(data, requiredFields.customer);
  }

  static checkAddressFields(data: Record<string, any>): Array<string> {
    return findMissingFields(data, requiredFields.address);
  }

  static checkCreateCustomerRequestFields(request: HttpRequest) {
    const data = request.body;

    const missingCustomerFields = this.checkCustomerFields(data);
    const missingAddressFields = this.checkAddressFields(data.address);

    const allMissingFields = [
      ...missingCustomerFields,
      ...missingAddressFields,
    ];

    return allMissingFields;
  }
}
