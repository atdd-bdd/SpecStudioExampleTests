
import * as tokens from "./tokens.js";

export class PatchTitleString {
  static readonly DNC_STRING = "?DNC?";

  title: string;

  constructor(title: string = "") {
    this.title = title;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): PatchTitleString {
    const parts = tokens.require_(text, 1, "PatchTitle");
    return new PatchTitleString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): PatchTitleString {
    const v = Array.from(values);
    const r = new PatchTitleString();
    r.title = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.title);
  }

  equals(other: PatchTitleString): boolean {
    return (this.title === PatchTitleString.DNC_STRING || other.title === PatchTitleString.DNC_STRING || this.title === other.title);
  }

  static equalLists(a: PatchTitleString[], b: PatchTitleString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
