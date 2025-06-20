import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CustomerProps } from '../../../../domain/entities/customer-props';
import { customerValidationError } from '../../../../domain/entities/errors/customerValidationError';

export type RegisterCustomerResponse = Either<
  customerValidationError | DuplicatedDataError,
  CustomerProps
>;
