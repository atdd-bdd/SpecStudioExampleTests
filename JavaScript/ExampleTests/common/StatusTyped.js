import { StatusString } from "./StatusString.js";
import * as _json from "./json.js";

export class StatusTyped {
  constructor(code = 0) {
    this.code = code;
  }

  static fromStringObj(s) {
    return new StatusTyped(
      s.code !== "" ? Number(s.code) : 0
    );
  }

  toStringObj() {
    return new StatusString(
      String(this.code)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => StatusTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      code: this.code,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new StatusTyped(
      _json.asInt(_json.require(m, "code"), "code")
    );
  }

  static fromJSON(text) { return StatusTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "StatusTyped");
    return raw.map((e) => StatusTyped.fromJsonValue(e));
  }

  toString() {
    return `Code=${this.code}`;
  }

  equals(other) {
    if (!(other instanceof StatusTyped)) return false;
    return this.code === other.code;
  }
}
