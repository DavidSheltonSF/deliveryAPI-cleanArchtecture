import { userValidationErrorType } from '../../../../domain/errors/errorTypes';
import { UpdateUserProfileDTO } from '../../../../presentation/dtos/UpdateUserProfileDTO';
import { Either } from '../../../../shared/either';
import { InvalidAgeError } from '../../../errors';
import { DuplicatedDataError } from '../../../errors/duplicated-data';

export type UpdateCustomerResponse = Either<
  userValidationErrorType | DuplicatedDataError | InvalidAgeError,
  UpdateUserProfileDTO
>;
