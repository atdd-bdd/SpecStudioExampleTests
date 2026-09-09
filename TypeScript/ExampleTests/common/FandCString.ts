
import * as tokens from "./tokens.js";

export class FandCString {
  static readonly DNC_STRING = "?DNC?";

  f: string;
  c: string;
  notes: string;

  constructor(f: string = "", c: string = "", notes: string = "") {
    this.f = f;
    this.c = c;
    this.notes = notes;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): FandCString {
    const parts = tokens.require_(text, 3, "FandC");
    return new FandCString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  static fromList(values: Iterable<string>): FandCString {
    const v = Array.from(values);
    const r = new FandCString();
    r.f = v[0] ?? "";
    r.c = v[1] ?? "";
    r.notes = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `F=${this.f}, C=${this.c}, Notes=${this.notes}`;
  }

  equals(other: FandCString): boolean {
    return (this.f === FandCString.DNC_STRING || other.f === FandCString.DNC_STRING || this.f === other.f)
      && (this.c === FandCString.DNC_STRING || other.c === FandCString.DNC_STRING || this.c === other.c)
      && (this.notes === FandCString.DNC_STRING || other.notes === FandCString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: FandCString[], b: FandCString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
