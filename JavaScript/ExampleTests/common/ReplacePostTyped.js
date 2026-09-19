import { ReplacePostString } from "./ReplacePostString.js";
import * as _json from "./json.js";

export class ReplacePostTyped {
  constructor(id = 0, userId = 0, title = "", body = "") {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  static fromStringObj(s) {
    return new ReplacePostTyped(
      s.id !== "" ? Number(s.id) : 0,
      s.userId !== "" ? Number(s.userId) : 0,
      s.title,
      s.body
    );
  }

  toStringObj() {
    return new ReplacePostString(
      String(this.id),
      String(this.userId),
      String(this.title),
      String(this.body)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ReplacePostTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      body: this.body,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ReplacePostTyped(
      _json.asInt(_json.require(m, "id"), "id"),
      _json.asInt(_json.require(m, "userId"), "userId"),
      _json.asString(_json.require(m, "title"), "title"),
      _json.asString(_json.require(m, "body"), "body")
    );
  }

  static fromJSON(text) { return ReplacePostTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ReplacePostTyped");
    return raw.map((e) => ReplacePostTyped.fromJsonValue(e));
  }

  toString() {
    return `id=${this.id}, userId=${this.userId}, title=${this.title}, body=${this.body}`;
  }

  equals(other) {
    if (!(other instanceof ReplacePostTyped)) return false;
    return this.id === other.id
      && this.userId === other.userId
      && this.title === other.title
      && this.body === other.body;
  }
}
