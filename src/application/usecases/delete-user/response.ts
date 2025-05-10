import { Either } from "../../../shared/either";
import { NoResultError } from "../_errors";
import { UserProps } from "../../../domain/entities/user-props";

export type DeleteUserResponse = Either<NoResultError, UserProps>;