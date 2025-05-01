import { Either } from "../../../shared/either";
import { NoResultError } from "../../../application/usecases/_erros";
import { UserProps } from "../../../domain/entities/userProps";

export type DeleteUserResponse = Either<NoResultError, UserProps>;