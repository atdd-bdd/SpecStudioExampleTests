import { StatusString } from "./StatusString.js";
import * as _json from "./json.js";

export class StatusTyped {
  code: number;

  constructor(code: number) {
    this.code = code;
  }

  static fromStringObj(s: StatusString): StatusTyped {
    return new StatusTyped(
      s.code !== "" ? Number(s.code) : 0
    );
  }

  toStringObj(): StatusString {
    return new StatusString(
      String(this.code)
    );
  }

  static toStringList(list: StatusTyped[]): StatusString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: StatusString[]): StatusTyped[] {
    return list.map(s => StatusTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      code: this.code,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): StatusTyped {
    return new StatusTyped(
      _json.asInt(_json.requireField(m, "code"), "code")
    );
  }

  static fromJSON(text: string): StatusTyped {
    return StatusTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly StatusTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): StatusTyped[] {
    const raw = _json.asArray(_json.parse(text), "StatusTyped") ?? [];
    return raw.map((e) => StatusTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Code=${this.code}`;
  }

  equals(other: StatusTyped): boolean {
    return this.code === other.code;
  }
}
