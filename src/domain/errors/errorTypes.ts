import { InvalidNameError } from './InvalidNameError';
import { InvalidAddressError } from './InvalidAddressError';
import { InvalidCardNumberError } from './InvalidCardNumberError';
import { InvalidCpfError } from './InvalidCpfError';
import { InvalidEmailError } from './InvalidEmailError';
import { InvalidPasswordError } from './InvalidPasswordError';
import { InvalidPaymentMethodError } from './InvalidPaymentMethodError';
import { InvalidPhoneError } from './InvalidPhoneError';
import { InvalidRoleError } from './InvalidRoleError';
import { InvalidAddressZipCodeError } from './InvalidAddressZipCodeError';
import { InvalidAddressStreetError } from './InvalidAddressStreetError';
import { InvalidAddressStateError } from './InvalidAddressStateError';
import { InvalidAddressCityError } from './InvalidAddressCityError';

export type userValidationError =
  | InvalidNameError
  | InvalidAddressError
  | InvalidCardNumberError
  | InvalidCpfError
  | InvalidEmailError
  | InvalidPasswordError
  | InvalidPaymentMethodError
  | InvalidPhoneError
  | InvalidRoleError;

export type addressErrorType =
  | InvalidAddressStreetError
  | InvalidAddressCityError
  | InvalidAddressStateError
  | InvalidAddressZipCodeError;
