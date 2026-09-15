
import * as tokens from "./tokens.js";

export class RequestString {
  static readonly DNC_STRING = "?DNC?";

  method: string;
  page: string;
  address: string;
  benchmark: string;
  format: string;

  constructor(method: string = "", page: string = "", address: string = "", benchmark: string = "", format: string = "") {
    this.method = method;
    this.page = page;
    this.address = address;
    this.benchmark = benchmark;
    this.format = format;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): RequestString {
    const parts = tokens.require_(text, 5, "Request");
    return new RequestString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4]
    );
  }

  static fromList(values: Iterable<string>): RequestString {
    const v = Array.from(values);
    const r = new RequestString();
    r.method = v[0] ?? "";
    r.page = v[1] ?? "";
    r.address = v[2] ?? "";
    r.benchmark = v[3] ?? "";
    r.format = v[4] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.method) + " " + tokens.token(this.page) + " " + tokens.token(this.address) + " " + tokens.token(this.benchmark) + " " + tokens.token(this.format);
  }

  equals(other: RequestString): boolean {
    return (this.method === RequestString.DNC_STRING || other.method === RequestString.DNC_STRING || this.method === other.method)
      && (this.page === RequestString.DNC_STRING || other.page === RequestString.DNC_STRING || this.page === other.page)
      && (this.address === RequestString.DNC_STRING || other.address === RequestString.DNC_STRING || this.address === other.address)
      && (this.benchmark === RequestString.DNC_STRING || other.benchmark === RequestString.DNC_STRING || this.benchmark === other.benchmark)
      && (this.format === RequestString.DNC_STRING || other.format === RequestString.DNC_STRING || this.format === other.format);
  }

  static equalLists(a: RequestString[], b: RequestString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
