import { FandCString } from "./FandCString.js";
import * as _json from "./json.js";

export class FandCTyped {
  f: number;
  c: number;
  notes: string;

  constructor(f: number, c: number, notes: string) {
    this.f = f;
    this.c = c;
    this.notes = notes;
  }

  static fromStringObj(s: FandCString): FandCTyped {
    return new FandCTyped(
      s.f !== "" ? Number(s.f) : 0,
      s.c !== "" ? Number(s.c) : 0,
      s.notes
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      f: this.f,
      c: this.c,
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): FandCTyped {
    return new FandCTyped(
      _json.asInt(_json.requireField(m, "f"), "f"),
      _json.asInt(_json.requireField(m, "c"), "c"),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): FandCTyped {
    return FandCTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly FandCTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): FandCTyped[] {
    const raw = _json.asArray(_json.parse(text), "FandCTyped") ?? [];
    return raw.map((e) => FandCTyped.fromJsonValue(e));
  }

  toString(): string {
    return `F=${this.f}, C=${this.c}, Notes=${this.notes}`;
  }

  equals(other: FandCTyped): boolean {
    return this.f === other.f
      && this.c === other.c
      && this.notes === other.notes;
  }
}
