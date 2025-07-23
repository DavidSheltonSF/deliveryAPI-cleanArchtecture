import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { customerValidationError } from '../../../../domain/errors/userValidationError';
import { CustomerUseCaseDto } from '../../../useCaseDtos/CustomerUseCaseDto';

export type RegisterCustomerResponse = Either<
  customerValidationError | DuplicatedDataError,
  CustomerUseCaseDto
>;
