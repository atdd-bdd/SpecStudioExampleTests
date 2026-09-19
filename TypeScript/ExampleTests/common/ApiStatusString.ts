
import * as tokens from "./tokens.js";

export class ApiStatusString {
  static readonly DNC_STRING = "?DNC?";

  code: string;

  constructor(code: string = "") {
    this.code = code;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ApiStatusString {
    const parts = tokens.require_(text, 1, "ApiStatus");
    return new ApiStatusString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): ApiStatusString {
    const v = Array.from(values);
    const r = new ApiStatusString();
    r.code = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.code);
  }

  equals(other: ApiStatusString): boolean {
    return (this.code === ApiStatusString.DNC_STRING || other.code === ApiStatusString.DNC_STRING || this.code === other.code);
  }

  static equalLists(a: ApiStatusString[], b: ApiStatusString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
