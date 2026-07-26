
export class ResultValueString {
  constructor(sum = "") {
    this.sum = sum;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ResultValueString(
      v[0] ?? ""
    );
  }

  toString() {
    return `Sum=${this.sum}`;
  }
}
