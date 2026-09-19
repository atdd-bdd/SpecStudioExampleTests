import { ApiStatusString } from "./ApiStatusString.js";
import * as _json from "./json.js";

export class ApiStatusTyped {
  constructor(code = 0) {
    this.code = code;
  }

  static fromStringObj(s) {
    return new ApiStatusTyped(
      s.code !== "" ? Number(s.code) : 0
    );
  }

  toStringObj() {
    return new ApiStatusString(
      String(this.code)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ApiStatusTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      code: this.code,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ApiStatusTyped(
      _json.asInt(_json.require(m, "code"), "code")
    );
  }

  static fromJSON(text) { return ApiStatusTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ApiStatusTyped");
    return raw.map((e) => ApiStatusTyped.fromJsonValue(e));
  }

  toString() {
    return `Code=${this.code}`;
  }

  equals(other) {
    if (!(other instanceof ApiStatusTyped)) return false;
    return this.code === other.code;
  }
}
