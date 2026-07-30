
export class SimpleClassString {
  static readonly DNC_STRING = "?DNC?";

  anInt: string;
  aString: string;

  constructor(anInt: string = "", aString: string = "") {
    this.anInt = anInt;
    this.aString = aString;
  }

  static fromList(values: Iterable<string>): SimpleClassString {
    const v = Array.from(values);
    const r = new SimpleClassString();
    r.anInt = v[0] ?? "";
    r.aString = v[1] ?? "";
    return r;
  }

  toString(): string {
    return `anInt=${this.anInt}, aString=${this.aString}`;
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
