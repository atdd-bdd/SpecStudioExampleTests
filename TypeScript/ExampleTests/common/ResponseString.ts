import { ResultString } from "./ResultString.js";

import * as tokens from "./tokens.js";

export class ResponseString {
  static readonly DNC_STRING = "?DNC?";

  result: ResultString;

  constructor(result: ResultString = new ResultString()) {
    this.result = result;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ResponseString {
    const parts = tokens.require_(text, 1, "Response");
    return new ResponseString(
      ResultString.fromText(parts[0])
    );
  }

  static fromList(values: Iterable<string>): ResponseString {
    const v = Array.from(values);
    const r = new ResponseString();
    return r;
  }

  toString(): string {
    return tokens.nested(String(this.result));
  }

  equals(other: ResponseString): boolean {
    return this.result.equals(other.result);
  }

  static equalLists(a: ResponseString[], b: ResponseString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
