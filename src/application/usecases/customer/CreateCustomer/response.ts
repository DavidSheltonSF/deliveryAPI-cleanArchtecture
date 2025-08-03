import { userValidationErrorType } from '../../../../domain/errors/errorTypes';
import { Either } from '../../../../shared/either';
import { InvalidAgeError } from '../../../errors';
import { DuplicatedDataError } from '../../../errors/duplicated-data';
import { CreateCustomerResponseDTO } from '../../../useCaseDtos/CreateCustomerResponseDTO';

export type CreateCustomerResponse = Either<
  userValidationErrorType | DuplicatedDataError | InvalidAgeError,
  CreateCustomerResponseDTO
>;
