import { UserProps } from "../../../domain/entities/user-props";
import { Either } from "../../../shared/either";
import { NoResultError } from "../_errors";

export type FindUserByIdResponse = Either<NoResultError, UserProps>;