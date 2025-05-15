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
 import { DuplicatedDataError } from "../../../_errors/duplicated-data";
import { UserProps } from "../../../../domain/entities/user-props";

export type RegisterUserResponse = Either<InvalidNameError
  | InvalidEmailError
  | InvalidPhoneError
  | InvalidCpfError
  | InvalidRoleError
  | InvalidAddressError
  | InvalidCardNumberError
  | InvalidPaymentMethodError
  | InvalidPasswordError
  | DuplicatedDataError, Omit<UserProps, "_id">>;