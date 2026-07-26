
export class FandCString {
  static DNC_STRING = "?DNC?";

  constructor(f = "", c = "", notes = "") {
    this.f = f;
    this.c = c;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new FandCString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString() {
    return `F=${this.f}, C=${this.c}, Notes=${this.notes}`;
  }

  equals(other) {
    if (!(other instanceof FandCString)) return false;
    return (this.f === FandCString.DNC_STRING || other.f === FandCString.DNC_STRING || this.f === other.f)
      && (this.c === FandCString.DNC_STRING || other.c === FandCString.DNC_STRING || this.c === other.c)
      && (this.notes === FandCString.DNC_STRING || other.notes === FandCString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
