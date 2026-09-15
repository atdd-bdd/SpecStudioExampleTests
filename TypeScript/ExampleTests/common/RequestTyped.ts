import { RequestString } from "./RequestString.js";
import * as _json from "./json.js";

export class RequestTyped {
  method: string;
  page: string;
  address: string;
  benchmark: string;
  format: string;

  constructor(method: string, page: string, address: string, benchmark: string, format: string) {
    this.method = method;
    this.page = page;
    this.address = address;
    this.benchmark = benchmark;
    this.format = format;
  }

  static fromStringObj(s: RequestString): RequestTyped {
    return new RequestTyped(
      s.method,
      s.page,
      s.address,
      s.benchmark,
      s.format
    );
  }

  toStringObj(): RequestString {
    return new RequestString(
      String(this.method),
      String(this.page),
      String(this.address),
      String(this.benchmark),
      String(this.format)
    );
  }

  static toStringList(list: RequestTyped[]): RequestString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: RequestString[]): RequestTyped[] {
    return list.map(s => RequestTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      method: this.method,
      page: this.page,
      address: this.address,
      benchmark: this.benchmark,
      format: this.format,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): RequestTyped {
    return new RequestTyped(
      _json.asString(_json.requireField(m, "method"), "method"),
      _json.asString(_json.requireField(m, "page"), "page"),
      _json.asString(_json.requireField(m, "address"), "address"),
      _json.asString(_json.requireField(m, "benchmark"), "benchmark"),
      _json.asString(_json.requireField(m, "format"), "format")
    );
  }

  static fromJSON(text: string): RequestTyped {
    return RequestTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly RequestTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): RequestTyped[] {
    const raw = _json.asArray(_json.parse(text), "RequestTyped") ?? [];
    return raw.map((e) => RequestTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Method=${this.method}, Page=${this.page}, Address=${this.address}, Benchmark=${this.benchmark}, Format=${this.format}`;
  }

  equals(other: RequestTyped): boolean {
    return this.method === other.method
      && this.page === other.page
      && this.address === other.address
      && this.benchmark === other.benchmark
      && this.format === other.format;
  }
}
