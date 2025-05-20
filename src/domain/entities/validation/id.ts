import { Either } from "../../../shared/either";
import { InvalidIDError } from "../_errors/invalid-id";
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

  static create(id: string): Either<InvalidIDError, ID> {
    if (!this.validate(id)) {
      return Either.left(new InvalidIDError(id));
    }

    return Either.right(new ID(id));
  }

  get(): string {
    return this.id;
  }
}