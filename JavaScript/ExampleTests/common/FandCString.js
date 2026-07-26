
export class FandCString {
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
}
