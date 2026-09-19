import { NewPostString } from "./NewPostString.js";
import * as _json from "./json.js";

export class NewPostTyped {
  title: string;
  body: string;
  userId: number;

  constructor(title: string, body: string, userId: number) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  static fromStringObj(s: NewPostString): NewPostTyped {
    return new NewPostTyped(
      s.title,
      s.body,
      s.userId !== "" ? Number(s.userId) : 0
    );
  }

  toStringObj(): NewPostString {
    return new NewPostString(
      String(this.title),
      String(this.body),
      String(this.userId)
    );
  }

  static toStringList(list: NewPostTyped[]): NewPostString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: NewPostString[]): NewPostTyped[] {
    return list.map(s => NewPostTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      title: this.title,
      body: this.body,
      userId: this.userId,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): NewPostTyped {
    return new NewPostTyped(
      _json.asString(_json.requireField(m, "title"), "title"),
      _json.asString(_json.requireField(m, "body"), "body"),
      _json.asInt(_json.requireField(m, "userId"), "userId")
    );
  }

  static fromJSON(text: string): NewPostTyped {
    return NewPostTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly NewPostTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): NewPostTyped[] {
    const raw = _json.asArray(_json.parse(text), "NewPostTyped") ?? [];
    return raw.map((e) => NewPostTyped.fromJsonValue(e));
  }

  toString(): string {
    return `title=${this.title}, body=${this.body}, userId=${this.userId}`;
  }

  equals(other: NewPostTyped): boolean {
    return this.title === other.title
      && this.body === other.body
      && this.userId === other.userId;
  }
}
