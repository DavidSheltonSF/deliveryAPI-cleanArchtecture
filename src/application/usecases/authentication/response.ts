import { Either } from '../../../shared/either';
import { NoResultError } from '../../errors';
import { EmailNotSentErrror } from '../../errors/EmailNotSentError';

export type CreateCustomerResponse = Either<
  NoResultError | EmailNotSentErrror,
  {message: 'Ok'}
>;
