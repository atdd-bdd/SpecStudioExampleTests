import { ValidValuesString } from "./ValidValuesString.js";
import * as _json from "./json.js";

export class ValidValuesTyped {
  constructor(value = "", isValid = false, notes = "") {
    this.value = value;
    this.isValid = isValid;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new ValidValuesTyped(
      s.value,
      ["true","t","yes","y","1"].includes(s.isValid.toLowerCase()),
      s.notes
    );
  }

  toJsonValue() {
    return {
      value: this.value,
      isValid: this.isValid,
      notes: this.notes,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ValidValuesTyped(
      _json.asString(_json.require(m, "value"), "value"),
      _json.asBool(_json.require(m, "isValid"), "isValid"),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return ValidValuesTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ValidValuesTyped");
    return raw.map((e) => ValidValuesTyped.fromJsonValue(e));
  }
}
