
export class FandCString {
  f: string;
  c: string;
  notes: string;

  constructor(f: string = "", c: string = "", notes: string = "") {
    this.f = f;
    this.c = c;
    this.notes = notes;
  }

  static fromList(values: Iterable<string>): FandCString {
    const v = Array.from(values);
    return new FandCString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString(): string {
    return `F=${this.f}, C=${this.c}, Notes=${this.notes}`;
  }
}
