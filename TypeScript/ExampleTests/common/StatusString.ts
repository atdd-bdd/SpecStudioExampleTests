
import * as tokens from "./tokens.js";

export class StatusString {
  static readonly DNC_STRING = "?DNC?";

  code: string;

  constructor(code: string = "") {
    this.code = code;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): StatusString {
    const parts = tokens.require_(text, 1, "Status");
    return new StatusString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): StatusString {
    const v = Array.from(values);
    const r = new StatusString();
    r.code = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.code);
  }

  equals(other: StatusString): boolean {
    return (this.code === StatusString.DNC_STRING || other.code === StatusString.DNC_STRING || this.code === other.code);
  }

  static equalLists(a: StatusString[], b: StatusString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
