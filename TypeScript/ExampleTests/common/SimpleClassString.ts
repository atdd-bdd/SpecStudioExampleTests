
import * as tokens from "./tokens.js";

export class SimpleClassString {
  static readonly DNC_STRING = "?DNC?";

  anInt: string;
  aString: string;

  constructor(anInt: string = "", aString: string = "") {
    this.anInt = anInt;
    this.aString = aString;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): SimpleClassString {
    const parts = tokens.require_(text, 2, "SimpleClass");
    return new SimpleClassString(
      parts[0],
      parts[1]
    );
  }

  static fromList(values: Iterable<string>): SimpleClassString {
    const v = Array.from(values);
    const r = new SimpleClassString();
    r.anInt = v[0] ?? "";
    r.aString = v[1] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.anInt) + " " + tokens.token(this.aString);
  }

  equals(other: SimpleClassString): boolean {
    return (this.anInt === SimpleClassString.DNC_STRING || other.anInt === SimpleClassString.DNC_STRING || this.anInt === other.anInt)
      && (this.aString === SimpleClassString.DNC_STRING || other.aString === SimpleClassString.DNC_STRING || this.aString === other.aString);
  }

  static equalLists(a: SimpleClassString[], b: SimpleClassString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
