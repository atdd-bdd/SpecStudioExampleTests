import { PatchTitleString } from "./PatchTitleString.js";
import * as _json from "./json.js";

export class PatchTitleTyped {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  static fromStringObj(s: PatchTitleString): PatchTitleTyped {
    return new PatchTitleTyped(
      s.title
    );
  }

  toStringObj(): PatchTitleString {
    return new PatchTitleString(
      String(this.title)
    );
  }

  static toStringList(list: PatchTitleTyped[]): PatchTitleString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: PatchTitleString[]): PatchTitleTyped[] {
    return list.map(s => PatchTitleTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      title: this.title,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): PatchTitleTyped {
    return new PatchTitleTyped(
      _json.asString(_json.requireField(m, "title"), "title")
    );
  }

  static fromJSON(text: string): PatchTitleTyped {
    return PatchTitleTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly PatchTitleTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): PatchTitleTyped[] {
    const raw = _json.asArray(_json.parse(text), "PatchTitleTyped") ?? [];
    return raw.map((e) => PatchTitleTyped.fromJsonValue(e));
  }

  toString(): string {
    return `title=${this.title}`;
  }

  equals(other: PatchTitleTyped): boolean {
    return this.title === other.title;
  }
}
