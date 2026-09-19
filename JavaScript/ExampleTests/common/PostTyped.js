import { PostString } from "./PostString.js";
import * as _json from "./json.js";

export class PostTyped {
  constructor(userId = 0, id = 0, title = "", body = "") {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  static fromStringObj(s) {
    return new PostTyped(
      s.userId !== "" ? Number(s.userId) : 0,
      s.id !== "" ? Number(s.id) : 0,
      s.title,
      s.body
    );
  }

  toStringObj() {
    return new PostString(
      String(this.userId),
      String(this.id),
      String(this.title),
      String(this.body)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => PostTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      userId: this.userId,
      id: this.id,
      title: this.title,
      body: this.body,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new PostTyped(
      _json.asInt(_json.require(m, "userId"), "userId"),
      _json.asInt(_json.require(m, "id"), "id"),
      _json.asString(_json.require(m, "title"), "title"),
      _json.asString(_json.require(m, "body"), "body")
    );
  }

  static fromJSON(text) { return PostTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "PostTyped");
    return raw.map((e) => PostTyped.fromJsonValue(e));
  }

  toString() {
    return `userId=${this.userId}, id=${this.id}, title=${this.title}, body=${this.body}`;
  }

  equals(other) {
    if (!(other instanceof PostTyped)) return false;
    return this.userId === other.userId
      && this.id === other.id
      && this.title === other.title
      && this.body === other.body;
  }
}
