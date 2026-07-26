
export class IDValueString {
  iD: string;
  value: string;

  constructor(iD: string = "", value: string = "") {
    this.iD = iD;
    this.value = value;
  }

  static fromList(values: Iterable<string>): IDValueString {
    const v = Array.from(values);
    return new IDValueString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  toString(): string {
    return `ID=${this.iD}, Value=${this.value}`;
  }
}
