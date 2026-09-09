
import * as tokens from "./tokens.js";

export class IDValueString {
  static readonly DNC_STRING = "?DNC?";

  iD: string;
  value: string;

  constructor(iD: string = "", value: string = "") {
    this.iD = iD;
    this.value = value;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): IDValueString {
    const parts = tokens.require_(text, 2, "IDValue");
    return new IDValueString(
      parts[0],
      parts[1]
    );
  }

  static fromList(values: Iterable<string>): IDValueString {
    const v = Array.from(values);
    const r = new IDValueString();
    r.iD = v[0] ?? "";
    r.value = v[1] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.iD) + " " + tokens.token(this.value);
  }

  equals(other: IDValueString): boolean {
    return (this.iD === IDValueString.DNC_STRING || other.iD === IDValueString.DNC_STRING || this.iD === other.iD)
      && (this.value === IDValueString.DNC_STRING || other.value === IDValueString.DNC_STRING || this.value === other.value);
  }

  static equalLists(a: IDValueString[], b: IDValueString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
