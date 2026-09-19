import { ApiStatusString } from "./ApiStatusString.js";
import * as _json from "./json.js";

export class ApiStatusTyped {
  code: number;

  constructor(code: number) {
    this.code = code;
  }

  static fromStringObj(s: ApiStatusString): ApiStatusTyped {
    return new ApiStatusTyped(
      s.code !== "" ? Number(s.code) : 0
    );
  }

  toStringObj(): ApiStatusString {
    return new ApiStatusString(
      String(this.code)
    );
  }

  static toStringList(list: ApiStatusTyped[]): ApiStatusString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ApiStatusString[]): ApiStatusTyped[] {
    return list.map(s => ApiStatusTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      code: this.code,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ApiStatusTyped {
    return new ApiStatusTyped(
      _json.asInt(_json.requireField(m, "code"), "code")
    );
  }

  static fromJSON(text: string): ApiStatusTyped {
    return ApiStatusTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ApiStatusTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ApiStatusTyped[] {
    const raw = _json.asArray(_json.parse(text), "ApiStatusTyped") ?? [];
    return raw.map((e) => ApiStatusTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Code=${this.code}`;
  }

  equals(other: ApiStatusTyped): boolean {
    return this.code === other.code;
  }
}
