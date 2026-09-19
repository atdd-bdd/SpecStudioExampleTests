import { PostString } from "./PostString.js";
import * as _json from "./json.js";

export class PostTyped {
  userId: number;
  id: number;
  title: string;
  body: string;

  constructor(userId: number, id: number, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  static fromStringObj(s: PostString): PostTyped {
    return new PostTyped(
      s.userId !== "" ? Number(s.userId) : 0,
      s.id !== "" ? Number(s.id) : 0,
      s.title,
      s.body
    );
  }

  toStringObj(): PostString {
    return new PostString(
      String(this.userId),
      String(this.id),
      String(this.title),
      String(this.body)
    );
  }

  static toStringList(list: PostTyped[]): PostString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: PostString[]): PostTyped[] {
    return list.map(s => PostTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      userId: this.userId,
      id: this.id,
      title: this.title,
      body: this.body,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): PostTyped {
    return new PostTyped(
      _json.asInt(_json.requireField(m, "userId"), "userId"),
      _json.asInt(_json.requireField(m, "id"), "id"),
      _json.asString(_json.requireField(m, "title"), "title"),
      _json.asString(_json.requireField(m, "body"), "body")
    );
  }

  static fromJSON(text: string): PostTyped {
    return PostTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly PostTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): PostTyped[] {
    const raw = _json.asArray(_json.parse(text), "PostTyped") ?? [];
    return raw.map((e) => PostTyped.fromJsonValue(e));
  }

  toString(): string {
    return `userId=${this.userId}, id=${this.id}, title=${this.title}, body=${this.body}`;
  }

  equals(other: PostTyped): boolean {
    return this.userId === other.userId
      && this.id === other.id
      && this.title === other.title
      && this.body === other.body;
  }
}
