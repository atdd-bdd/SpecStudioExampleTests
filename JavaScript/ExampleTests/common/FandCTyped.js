import { FandCString } from "./FandCString.js";
import * as _json from "./json.js";

export class FandCTyped {
  constructor(f = 0, c = 0, notes = "") {
    this.f = f;
    this.c = c;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new FandCTyped(
      s.f !== "" ? Number(s.f) : 0,
      s.c !== "" ? Number(s.c) : 0,
      s.notes
    );
  }

  toStringObj() {
    return new FandCString(
      String(this.f),
      String(this.c),
      String(this.notes)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => FandCTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      f: this.f,
      c: this.c,
      notes: this.notes,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new FandCTyped(
      _json.asInt(_json.require(m, "f"), "f"),
      _json.asInt(_json.require(m, "c"), "c"),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return FandCTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "FandCTyped");
    return raw.map((e) => FandCTyped.fromJsonValue(e));
  }

  toString() {
    return `F=${this.f}, C=${this.c}, Notes=${this.notes}`;
  }

  equals(other) {
    if (!(other instanceof FandCTyped)) return false;
    return this.f === other.f
      && this.c === other.c
      && this.notes === other.notes;
  }
}
