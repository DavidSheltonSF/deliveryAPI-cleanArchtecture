import { Either } from "../../../shared/either";
import { NoResultError } from "../_errors";
import { UserProps } from "../../../domain/entities/userProps";

export type DeleteUserResponse = Either<NoResultError, UserProps>;