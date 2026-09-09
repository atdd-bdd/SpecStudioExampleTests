
import * as tokens from "./tokens.js";

export class ResultValueString {
  static readonly DNC_STRING = "?DNC?";

  sum: string;

  constructor(sum: string = "") {
    this.sum = sum;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ResultValueString {
    const parts = tokens.require_(text, 1, "ResultValue");
    return new ResultValueString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): ResultValueString {
    const v = Array.from(values);
    const r = new ResultValueString();
    r.sum = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.sum);
  }

  equals(other: ResultValueString): boolean {
    return (this.sum === ResultValueString.DNC_STRING || other.sum === ResultValueString.DNC_STRING || this.sum === other.sum);
  }

  static equalLists(a: ResultValueString[], b: ResultValueString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
