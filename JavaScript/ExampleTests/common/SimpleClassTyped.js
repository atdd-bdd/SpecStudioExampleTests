import { SimpleClassString } from "./SimpleClassString.js";
import * as _json from "./json.js";

export class SimpleClassTyped {
  constructor(anInt = 0, aString = "") {
    this.anInt = anInt;
    this.aString = aString;
  }

  static fromStringObj(s) {
    return new SimpleClassTyped(
      s.anInt !== "" ? Number(s.anInt) : 0,
      s.aString
    );
  }

  toJsonValue() {
    return {
      anInt: this.anInt,
      aString: this.aString,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new SimpleClassTyped(
      _json.asInt(_json.require(m, "anInt"), "anInt"),
      _json.asString(_json.require(m, "aString"), "aString")
    );
  }

  static fromJSON(text) { return SimpleClassTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "SimpleClassTyped");
    return raw.map((e) => SimpleClassTyped.fromJsonValue(e));
  }

  toString() {
    return `anInt=${this.anInt}, aString=${this.aString}`;
  }

  equals(other) {
    if (!(other instanceof SimpleClassTyped)) return false;
    return this.anInt === other.anInt
      && this.aString === other.aString;
  }
}
