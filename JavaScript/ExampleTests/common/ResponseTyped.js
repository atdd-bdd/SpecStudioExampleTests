import { ResponseString } from "./ResponseString.js";
import * as _json from "./json.js";
import { ResultTyped } from "./ResultTyped.js";

export class ResponseTyped {
  constructor(result = "") {
    this.result = result;
  }

  static fromStringObj(s) {
    return new ResponseTyped(
      ResultTyped.fromStringObj(s.result)
    );
  }

  toStringObj() {
    return new ResponseString(
      this.result.toStringObj()
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ResponseTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      result: this.result.toJsonValue(),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ResponseTyped(
      ResultTyped.fromJsonValue(_json.require(m, "result"))
    );
  }

  static fromJSON(text) { return ResponseTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ResponseTyped");
    return raw.map((e) => ResponseTyped.fromJsonValue(e));
  }

  toString() {
    return `result=${this.result}`;
  }

  equals(other) {
    if (!(other instanceof ResponseTyped)) return false;
    return this.result.equals(other.result);
  }
}
