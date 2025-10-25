import { userValidationErrorType } from '../../../../domain/errors/errorTypes';
import { Either } from '../../../../shared/either';
import { InvalidAgeError } from '../../../errors';
import { DuplicatedDataError } from '../../../errors/duplicated-data';
import { CustomerResponseDTO } from '../../../useCaseDtos/CustomerResponseDTO';

export type CreateCustomerResponse = Either<
  userValidationErrorType | DuplicatedDataError | InvalidAgeError,
  CustomerResponseDTO
>;
