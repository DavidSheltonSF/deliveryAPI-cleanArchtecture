import { userValidationErrorType } from '../../../../domain/errors/errorTypes';
import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { UserUseCaseDTO } from '../../../useCaseDtos/UserUseCaseDTO';

export type CreateUserResponse = Either<
  userValidationErrorType | DuplicatedDataError,
  UserUseCaseDTO
>;
