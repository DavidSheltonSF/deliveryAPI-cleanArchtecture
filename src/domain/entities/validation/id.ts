import { Either } from "../../../shared/either";
import { InvalidIdError } from "../_errors/";
import { mongoHelper } from "../../../infrastructure/repositories/mongodb/helpers/mongo-helper";

export class ID {
  private readonly id: string;

  constructor(id: string){
    this.id = id;
    Object.freeze(this);
  };

  static validate(id: string): boolean{
    try {
      mongoHelper.toObjectId(id);
      return true;
    }catch{
      return false;
    }
  }

  static create(id: string): Either<InvalidIdError, ID> {
    if (!this.validate(id)) {
      return Either.left(new InvalidIdError(id));
    }

    return Either.right(new ID(id));
  }

  get(): string {
    return this.id;
  }
}