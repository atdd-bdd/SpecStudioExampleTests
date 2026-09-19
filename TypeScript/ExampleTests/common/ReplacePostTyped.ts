import { ReplacePostString } from "./ReplacePostString.js";
import * as _json from "./json.js";

export class ReplacePostTyped {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor(id: number, userId: number, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  static fromStringObj(s: ReplacePostString): ReplacePostTyped {
    return new ReplacePostTyped(
      s.id !== "" ? Number(s.id) : 0,
      s.userId !== "" ? Number(s.userId) : 0,
      s.title,
      s.body
    );
  }

  toStringObj(): ReplacePostString {
    return new ReplacePostString(
      String(this.id),
      String(this.userId),
      String(this.title),
      String(this.body)
    );
  }

  static toStringList(list: ReplacePostTyped[]): ReplacePostString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ReplacePostString[]): ReplacePostTyped[] {
    return list.map(s => ReplacePostTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      body: this.body,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ReplacePostTyped {
    return new ReplacePostTyped(
      _json.asInt(_json.requireField(m, "id"), "id"),
      _json.asInt(_json.requireField(m, "userId"), "userId"),
      _json.asString(_json.requireField(m, "title"), "title"),
      _json.asString(_json.requireField(m, "body"), "body")
    );
  }

  static fromJSON(text: string): ReplacePostTyped {
    return ReplacePostTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ReplacePostTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ReplacePostTyped[] {
    const raw = _json.asArray(_json.parse(text), "ReplacePostTyped") ?? [];
    return raw.map((e) => ReplacePostTyped.fromJsonValue(e));
  }

  toString(): string {
    return `id=${this.id}, userId=${this.userId}, title=${this.title}, body=${this.body}`;
  }

  equals(other: ReplacePostTyped): boolean {
    return this.id === other.id
      && this.userId === other.userId
      && this.title === other.title
      && this.body === other.body;
  }
}
