
export class ResultValueString {
  static DNC_STRING = "?DNC?";

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

  equals(other) {
    if (!(other instanceof ResultValueString)) return false;
    return (this.sum === ResultValueString.DNC_STRING || other.sum === ResultValueString.DNC_STRING || this.sum === other.sum);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
