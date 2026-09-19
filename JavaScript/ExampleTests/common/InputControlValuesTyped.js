import { InputControlValuesString } from "./InputControlValuesString.js";
import * as _json from "./json.js";

export class InputControlValuesTyped {
  constructor(frame = 0, roll = "", remaining = "") {
    this.frame = frame;
    this.roll = roll;
    this.remaining = remaining;
  }

  static fromStringObj(s) {
    return new InputControlValuesTyped(
      s.frame !== "" ? Number(s.frame) : 0,
      s.roll,
      s.remaining
    );
  }

  toStringObj() {
    return new InputControlValuesString(
      String(this.frame),
      String(this.roll),
      String(this.remaining)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => InputControlValuesTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      frame: this.frame,
      roll: this.roll == null ? null : String(this.roll),
      remaining: this.remaining == null ? null : String(this.remaining),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new InputControlValuesTyped(
      _json.asInt(_json.require(m, "frame"), "frame"),
      new Pins(_json.asString(_json.require(m, "roll"), "roll")),
      new Pins(_json.asString(_json.require(m, "remaining"), "remaining"))
    );
  }

  static fromJSON(text) { return InputControlValuesTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "InputControlValuesTyped");
    return raw.map((e) => InputControlValuesTyped.fromJsonValue(e));
  }

  toString() {
    return `Frame=${this.frame}, Roll=${this.roll}, Remaining=${this.remaining}`;
  }

  equals(other) {
    if (!(other instanceof InputControlValuesTyped)) return false;
    return this.frame === other.frame
      && this.roll === other.roll
      && this.remaining === other.remaining;
  }
}
