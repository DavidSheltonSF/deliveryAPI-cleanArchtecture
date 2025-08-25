import { Either } from '../../../../shared/either';

export type ChangePasswordResponse = Either<Error, { message: 'Ok' }>;
