import { InvalidIdError } from "../../../../domain/entities/_errors/invalid-id";
import { UserProps } from "../../../../domain/entities/user-props";
import { Either } from "../../../../shared/either";

export type FindUserByIdResponse = Either<InvalidIdError, UserProps | null>;