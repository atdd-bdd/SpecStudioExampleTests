import { PatchTitleString } from "./PatchTitleString.js";
import * as _json from "./json.js";

export class PatchTitleTyped {
  constructor(title = "") {
    this.title = title;
  }

  static fromStringObj(s) {
    return new PatchTitleTyped(
      s.title
    );
  }

  toStringObj() {
    return new PatchTitleString(
      String(this.title)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => PatchTitleTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      title: this.title,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new PatchTitleTyped(
      _json.asString(_json.require(m, "title"), "title")
    );
  }

  static fromJSON(text) { return PatchTitleTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "PatchTitleTyped");
    return raw.map((e) => PatchTitleTyped.fromJsonValue(e));
  }

  toString() {
    return `title=${this.title}`;
  }

  equals(other) {
    if (!(other instanceof PatchTitleTyped)) return false;
    return this.title === other.title;
  }
}
