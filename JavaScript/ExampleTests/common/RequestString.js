import * as tokens from "./tokens.js";

export class RequestString {
  static DNC_STRING = "?DNC?";

  constructor(method = "", page = "", address = "", benchmark = "", format = "") {
    this.method = method;
    this.page = page;
    this.address = address;
    this.benchmark = benchmark;
    this.format = format;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new RequestString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 5, "Request");
    return new RequestString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4]
    );
  }

  toString() {
    return tokens.token(this.method) + " " + tokens.token(this.page) + " " + tokens.token(this.address) + " " + tokens.token(this.benchmark) + " " + tokens.token(this.format);
  }

  equals(other) {
    if (!(other instanceof RequestString)) return false;
    return (this.method === RequestString.DNC_STRING || other.method === RequestString.DNC_STRING || this.method === other.method)
      && (this.page === RequestString.DNC_STRING || other.page === RequestString.DNC_STRING || this.page === other.page)
      && (this.address === RequestString.DNC_STRING || other.address === RequestString.DNC_STRING || this.address === other.address)
      && (this.benchmark === RequestString.DNC_STRING || other.benchmark === RequestString.DNC_STRING || this.benchmark === other.benchmark)
      && (this.format === RequestString.DNC_STRING || other.format === RequestString.DNC_STRING || this.format === other.format);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
