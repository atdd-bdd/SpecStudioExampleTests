import { NewPostString } from "./NewPostString.js";
import * as _json from "./json.js";

export class NewPostTyped {
  constructor(title = "", body = "", userId = 0) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  static fromStringObj(s) {
    return new NewPostTyped(
      s.title,
      s.body,
      s.userId !== "" ? Number(s.userId) : 0
    );
  }

  toStringObj() {
    return new NewPostString(
      String(this.title),
      String(this.body),
      String(this.userId)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => NewPostTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      title: this.title,
      body: this.body,
      userId: this.userId,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new NewPostTyped(
      _json.asString(_json.require(m, "title"), "title"),
      _json.asString(_json.require(m, "body"), "body"),
      _json.asInt(_json.require(m, "userId"), "userId")
    );
  }

  static fromJSON(text) { return NewPostTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "NewPostTyped");
    return raw.map((e) => NewPostTyped.fromJsonValue(e));
  }

  toString() {
    return `title=${this.title}, body=${this.body}, userId=${this.userId}`;
  }

  equals(other) {
    if (!(other instanceof NewPostTyped)) return false;
    return this.title === other.title
      && this.body === other.body
      && this.userId === other.userId;
  }
}
