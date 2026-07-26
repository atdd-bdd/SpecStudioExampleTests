import { FilterValueString } from "./FilterValueString.js";
import * as _json from "./json.js";

export class FilterValueTyped {
  constructor(value = "") {
    this.value = value;
  }

  static fromStringObj(s) {
    return new FilterValueTyped(
      new IDForm(s.value)
    );
  }

  toJsonValue() {
    return {
      value: this.value == null ? null : String(this.value),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new FilterValueTyped(
      new IDForm(_json.asString(_json.require(m, "value"), "value"))
    );
  }

  static fromJSON(text) { return FilterValueTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "FilterValueTyped");
    return raw.map((e) => FilterValueTyped.fromJsonValue(e));
  }
}
