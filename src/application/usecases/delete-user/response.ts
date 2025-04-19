import { Either } from "../../../shared/either";
import { InvalidEmailError } from "../../../domain/entities/_errors";
import { DuplicatedDataError, NoResultError} from "../../../application/usecases/_erros";
import { UserProps } from "../../../domain/entities/userProps";

export type DeleteUserResponse = Either<InvalidEmailError
  | NoResultError, UserProps>;