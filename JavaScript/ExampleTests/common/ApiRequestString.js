import * as tokens from "./tokens.js";

export class ApiRequestString {
  static DNC_STRING = "?DNC?";

  constructor(method = "", page = "", parameter = "", body = "") {
    this.method = method;
    this.page = page;
    this.parameter = parameter;
    this.body = body;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ApiRequestString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 4, "ApiRequest");
    return new ApiRequestString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  toString() {
    return tokens.token(this.method) + " " + tokens.token(this.page) + " " + tokens.token(this.parameter) + " " + tokens.token(this.body);
  }

  equals(other) {
    if (!(other instanceof ApiRequestString)) return false;
    return (this.method === ApiRequestString.DNC_STRING || other.method === ApiRequestString.DNC_STRING || this.method === other.method)
      && (this.page === ApiRequestString.DNC_STRING || other.page === ApiRequestString.DNC_STRING || this.page === other.page)
      && (this.parameter === ApiRequestString.DNC_STRING || other.parameter === ApiRequestString.DNC_STRING || this.parameter === other.parameter)
      && (this.body === ApiRequestString.DNC_STRING || other.body === ApiRequestString.DNC_STRING || this.body === other.body);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
