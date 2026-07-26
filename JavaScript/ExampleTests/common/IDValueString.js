
export class IDValueString {
  constructor(iD = "", value = "") {
    this.iD = iD;
    this.value = value;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new IDValueString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  toString() {
    return `ID=${this.iD}, Value=${this.value}`;
  }
}
