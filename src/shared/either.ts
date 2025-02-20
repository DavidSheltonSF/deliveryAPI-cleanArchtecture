export class Either <L, R> {
  constructor(private leftValue?: L, private rightValue?: R) {}

  static left<L, R>(value: L): Either<L, R> {
    return new Either(value, undefined);
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Either(undefined, value);
  }
  
  isLeft(): Boolean {
    return this.leftValue !== undefined;
  }

  isRight(): Boolean {
    return this.rightValue !== undefined;
  }

  getLeft(): L {
    if (this.leftValue === undefined) {
      throw new Error('No left value present');
    }

    return this.leftValue;
  }

  getRight(): R {
    if (this.rightValue === undefined){
      throw new Error('No right value present');
    }

    return this.rightValue;
  }

}