import { ResultValueString } from "./ResultValueString.js";
import * as _json from "./json.js";

export class ResultValueTyped {
  constructor(sum = 0) {
    this.sum = sum;
  }

  static fromStringObj(s) {
    return new ResultValueTyped(
      s.sum !== "" ? Number(s.sum) : 0
    );
  }

  toStringObj() {
    return new ResultValueString(
      String(this.sum)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ResultValueTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      sum: this.sum,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ResultValueTyped(
      _json.asInt(_json.require(m, "sum"), "sum")
    );
  }

  static fromJSON(text) { return ResultValueTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ResultValueTyped");
    return raw.map((e) => ResultValueTyped.fromJsonValue(e));
  }

  toString() {
    return `Sum=${this.sum}`;
  }

  equals(other) {
    if (!(other instanceof ResultValueTyped)) return false;
    return this.sum === other.sum;
  }
}
