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

  static checkAuthenticationFields(data: Record<string, any>): Array<string> {
    return findMissingFields(data, requiredFields.authentication);
  }

  static checkCreateCustomerRequestFields(request: HttpRequest) {
    const data = request.body;

    const missingCustomerFields = this.checkCustomerFields(data);
    const missingAddressFields = this.checkAddressFields(data.address);
    const missingAuthFields = this.checkAuthenticationFields(data.authentication);

    const allMissingFields = [
      ...missingCustomerFields,
      ...missingAddressFields,
      ...missingAuthFields,
    ];

    return allMissingFields;
  }
}
