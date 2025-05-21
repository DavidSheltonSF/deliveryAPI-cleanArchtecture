import { InvalidEmailError } from "../../../../domain/entities/_errors";
import { UserProps } from "../../../../domain/entities/user-props";
import { Either } from "../../../../shared/either";

export type FindUserByEmailResponse = Either<InvalidEmailError, UserProps | null>;
