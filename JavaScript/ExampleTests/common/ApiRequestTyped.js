import { ApiRequestString } from "./ApiRequestString.js";
import * as _json from "./json.js";

export class ApiRequestTyped {
  constructor(method = "", page = "", parameter = "", body = "") {
    this.method = method;
    this.page = page;
    this.parameter = parameter;
    this.body = body;
  }

  static fromStringObj(s) {
    return new ApiRequestTyped(
      s.method,
      s.page,
      s.parameter,
      s.body
    );
  }

  toStringObj() {
    return new ApiRequestString(
      String(this.method),
      String(this.page),
      String(this.parameter),
      String(this.body)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ApiRequestTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      method: this.method,
      page: this.page,
      parameter: this.parameter,
      body: this.body,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ApiRequestTyped(
      _json.asString(_json.require(m, "method"), "method"),
      _json.asString(_json.require(m, "page"), "page"),
      _json.asString(_json.require(m, "parameter"), "parameter"),
      _json.asString(_json.require(m, "body"), "body")
    );
  }

  static fromJSON(text) { return ApiRequestTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ApiRequestTyped");
    return raw.map((e) => ApiRequestTyped.fromJsonValue(e));
  }

  toString() {
    return `Method=${this.method}, Page=${this.page}, Parameter=${this.parameter}, Body=${this.body}`;
  }

  equals(other) {
    if (!(other instanceof ApiRequestTyped)) return false;
    return this.method === other.method
      && this.page === other.page
      && this.parameter === other.parameter
      && this.body === other.body;
  }
}
