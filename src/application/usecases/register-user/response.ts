import { Either } from "shared/either";
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
 } from "domain/entities/_errors";
 import { DuplicatedDataError } from "../_erros/duplicated-data";
import { User as UserData } from "domain/entities/user";

export type RegisterUserResponse = Either<InvalidNameError
  | InvalidEmailError
  | InvalidPhoneError
  | InvalidCpfError
  | InvalidRoleError
  | InvalidAddressError
  | InvalidCardNumberError
  | InvalidPaymentMethodError
  | InvalidPasswordError
  | DuplicatedDataError, UserData>;