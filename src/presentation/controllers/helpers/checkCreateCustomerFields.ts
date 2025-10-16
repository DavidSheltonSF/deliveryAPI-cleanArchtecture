import { findMissingFields } from '../../../utils/findMissingFields';
import { requiredFields } from './requiredFields';

export function checkCreateCustomerFields(fields: Record<string, any>) {
  return findMissingFields(fields, requiredFields.customer);
}
