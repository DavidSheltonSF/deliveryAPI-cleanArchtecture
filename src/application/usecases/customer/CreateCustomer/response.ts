import { userValidationErrorType } from '../../../../domain/errors/errorTypes';
import { Either } from '../../../../shared/either';
import { InvalidAgeError } from '../../../_errors';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { CreateCustomerResponseDTO } from '../../../useCaseDtos/CreateCustomerResponseDTO';

export type CreateCustomerResponse = Either<
  userValidationErrorType | DuplicatedDataError | InvalidAgeError,
  CreateCustomerResponseDTO
>;
