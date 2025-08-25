import { Either } from '../../../shared/either';
import { NoResultError } from '../../errors';
import { EmailNotSentErrror } from '../../errors/EmailNotSentError';

export type RequestPasswordChangeUseCaseResponse = Either<
  NoResultError | EmailNotSentErrror,
  {message: 'Ok'}
>;
