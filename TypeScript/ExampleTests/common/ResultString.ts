
import * as tokens from "./tokens.js";

export class ResultString {
  static readonly DNC_STRING = "?DNC?";

  addressMatches: string;

  constructor(addressMatches: string = "") {
    this.addressMatches = addressMatches;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ResultString {
    const parts = tokens.require_(text, 1, "Result");
    return new ResultString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): ResultString {
    const v = Array.from(values);
    const r = new ResultString();
    r.addressMatches = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.addressMatches);
  }

  equals(other: ResultString): boolean {
    return (this.addressMatches === ResultString.DNC_STRING || other.addressMatches === ResultString.DNC_STRING || this.addressMatches === other.addressMatches);
  }

  static equalLists(a: ResultString[], b: ResultString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
