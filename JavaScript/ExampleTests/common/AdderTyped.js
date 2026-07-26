import { AdderString } from "./AdderString.js";
import * as _json from "./json.js";

export class AdderTyped {
  constructor(number1 = 0, number2 = 0, result = 0) {
    this.number1 = number1;
    this.number2 = number2;
    this.result = result;
  }

  static fromStringObj(s) {
    return new AdderTyped(
      s.number1 !== "" ? Number(s.number1) : 0,
      s.number2 !== "" ? Number(s.number2) : 0,
      s.result !== "" ? Number(s.result) : 0
    );
  }

  toJsonValue() {
    return {
      number1: this.number1,
      number2: this.number2,
      result: this.result,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new AdderTyped(
      _json.asInt(_json.require(m, "number1"), "number1"),
      _json.asInt(_json.require(m, "number2"), "number2"),
      _json.asInt(_json.require(m, "result"), "result")
    );
  }

  static fromJSON(text) { return AdderTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "AdderTyped");
    return raw.map((e) => AdderTyped.fromJsonValue(e));
  }

  toString() {
    return `number1=${this.number1}, number2=${this.number2}, result=${this.result}`;
  }

  equals(other) {
    if (!(other instanceof AdderTyped)) return false;
    return this.number1 === other.number1
      && this.number2 === other.number2
      && this.result === other.result;
  }
}
