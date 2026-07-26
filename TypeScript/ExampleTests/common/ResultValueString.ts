
export class ResultValueString {
  sum: string;

  constructor(sum: string = "") {
    this.sum = sum;
  }

  static fromList(values: Iterable<string>): ResultValueString {
    const v = Array.from(values);
    return new ResultValueString(
      v[0] ?? ""
    );
  }

  toString(): string {
    return `Sum=${this.sum}`;
  }
}
