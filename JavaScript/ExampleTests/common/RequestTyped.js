import { RequestString } from "./RequestString.js";
import * as _json from "./json.js";

export class RequestTyped {
  constructor(method = "", page = "", address = "", benchmark = "", format = "") {
    this.method = method;
    this.page = page;
    this.address = address;
    this.benchmark = benchmark;
    this.format = format;
  }

  static fromStringObj(s) {
    return new RequestTyped(
      s.method,
      s.page,
      s.address,
      s.benchmark,
      s.format
    );
  }

  toStringObj() {
    return new RequestString(
      String(this.method),
      String(this.page),
      String(this.address),
      String(this.benchmark),
      String(this.format)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => RequestTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      method: this.method,
      page: this.page,
      address: this.address,
      benchmark: this.benchmark,
      format: this.format,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new RequestTyped(
      _json.asString(_json.require(m, "method"), "method"),
      _json.asString(_json.require(m, "page"), "page"),
      _json.asString(_json.require(m, "address"), "address"),
      _json.asString(_json.require(m, "benchmark"), "benchmark"),
      _json.asString(_json.require(m, "format"), "format")
    );
  }

  static fromJSON(text) { return RequestTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "RequestTyped");
    return raw.map((e) => RequestTyped.fromJsonValue(e));
  }

  toString() {
    return `Method=${this.method}, Page=${this.page}, Address=${this.address}, Benchmark=${this.benchmark}, Format=${this.format}`;
  }

  equals(other) {
    if (!(other instanceof RequestTyped)) return false;
    return this.method === other.method
      && this.page === other.page
      && this.address === other.address
      && this.benchmark === other.benchmark
      && this.format === other.format;
  }
}
