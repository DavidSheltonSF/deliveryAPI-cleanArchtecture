import { InvalidNameError } from './InvalidNameError';
import { InvalidAddressError } from './InvalidAddressError';
import { InvalidCardNumberError } from './InvalidCardNumberError';
import { InvalidCpfError } from './InvalidCpfError';
import { InvalidEmailError } from './InvalidEmailError';
import { InvalidPasswordError } from './InvalidPasswordError';
import { InvalidPaymentMethodError } from './InvalidPaymentMethodError';
import { InvalidPhoneError } from './InvalidPhoneError';
import { InvalidRoleError } from './InvalidRoleError';
import { InvalidZipCodeError } from './InvalidZipCodeError';

export type customerValidationError =
  | InvalidNameError
  | InvalidZipCodeError
  | InvalidAddressError
  | InvalidCardNumberError
  | InvalidCpfError
  | InvalidEmailError
  | InvalidPasswordError
  | InvalidPaymentMethodError
  | InvalidPhoneError
  | InvalidRoleError;
