import { Either } from "../../../../shared/either";
import { 
  InvalidNameError,
  InvalidEmailError,
  InvalidPhoneError,
  InvalidCpfError,
  InvalidRoleError,
  InvalidAddressError,
  InvalidCardNumberError,
  InvalidPaymentMethodError,
  InvalidPasswordError
 } from "../../../../domain/entities/_errors";
 import { NoResultError } from "../../../_errors";
import { UserProps } from "../../../../domain/entities/user-props";

export type UpdateUserResponse = Either<InvalidNameError
  | InvalidEmailError
  | InvalidPhoneError
  | InvalidCpfError
  | InvalidRoleError
  | InvalidAddressError
  | InvalidCardNumberError
  | InvalidPaymentMethodError
  | InvalidPasswordError
  | NoResultError, UserProps>;