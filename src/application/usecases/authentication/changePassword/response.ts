import { InvalidPasswordError } from '../../../../domain/errors';
import { Either } from '../../../../shared/either';
import { NoResultError } from '../../../errors';
import { InvalidTokenError } from '../../../errors/InvalidTokenError';
import { SimilarPasswordsError } from '../../../errors/SimilarPasswordsError';

export type ChangePasswordResponse = Either<
  | NoResultError
  | SimilarPasswordsError
  | InvalidTokenError
  | InvalidPasswordError,
  { message: 'Ok' }
>;
