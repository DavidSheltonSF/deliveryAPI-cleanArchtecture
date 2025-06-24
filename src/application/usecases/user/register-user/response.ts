import { Either } from '../../../../shared/either';
import { DuplicatedDataError } from '../../../_errors/duplicated-data';
import { customerValidationError } from '../../../../domain/entities/errors/customerValidationError';
import { CustomerUseCaseDto } from '../../../useCaseDtos/CustomerUseCaseDto';

export type RegisterCustomerResponse = Either<
  customerValidationError | DuplicatedDataError,
  {
    id: string;
    customerData: CustomerUseCaseDto;
  }
>;
