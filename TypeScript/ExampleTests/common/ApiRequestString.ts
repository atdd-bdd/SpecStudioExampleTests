
import * as tokens from "./tokens.js";

export class ApiRequestString {
  static readonly DNC_STRING = "?DNC?";

  method: string;
  page: string;
  parameter: string;
  body: string;

  constructor(method: string = "", page: string = "", parameter: string = "", body: string = "") {
    this.method = method;
    this.page = page;
    this.parameter = parameter;
    this.body = body;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ApiRequestString {
    const parts = tokens.require_(text, 4, "ApiRequest");
    return new ApiRequestString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  static fromList(values: Iterable<string>): ApiRequestString {
    const v = Array.from(values);
    const r = new ApiRequestString();
    r.method = v[0] ?? "";
    r.page = v[1] ?? "";
    r.parameter = v[2] ?? "";
    r.body = v[3] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.method) + " " + tokens.token(this.page) + " " + tokens.token(this.parameter) + " " + tokens.token(this.body);
  }

  equals(other: ApiRequestString): boolean {
    return (this.method === ApiRequestString.DNC_STRING || other.method === ApiRequestString.DNC_STRING || this.method === other.method)
      && (this.page === ApiRequestString.DNC_STRING || other.page === ApiRequestString.DNC_STRING || this.page === other.page)
      && (this.parameter === ApiRequestString.DNC_STRING || other.parameter === ApiRequestString.DNC_STRING || this.parameter === other.parameter)
      && (this.body === ApiRequestString.DNC_STRING || other.body === ApiRequestString.DNC_STRING || this.body === other.body);
  }

  static equalLists(a: ApiRequestString[], b: ApiRequestString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
