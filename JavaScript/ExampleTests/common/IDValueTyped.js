import { IDValueString } from "./IDValueString.js";
import * as _json from "./json.js";

export class IDValueTyped {
  constructor(iD = "", value = 0) {
    this.iD = iD;
    this.value = value;
  }

  static fromStringObj(s) {
    return new IDValueTyped(
      new IDForm(s.iD),
      s.value !== "" ? Number(s.value) : 0
    );
  }

  toJsonValue() {
    return {
      iD: this.iD == null ? null : String(this.iD),
      value: this.value,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new IDValueTyped(
      new IDForm(_json.asString(_json.require(m, "iD"), "iD")),
      _json.asInt(_json.require(m, "value"), "value")
    );
  }

  static fromJSON(text) { return IDValueTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "IDValueTyped");
    return raw.map((e) => IDValueTyped.fromJsonValue(e));
  }
}
