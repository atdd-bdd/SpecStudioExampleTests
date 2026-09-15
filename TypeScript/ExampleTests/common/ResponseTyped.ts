import { ResponseString } from "./ResponseString.js";
import * as _json from "./json.js";
import { ResultTyped } from "./ResultTyped.js";

export class ResponseTyped {
  result: ResultTyped;

  constructor(result: ResultTyped) {
    this.result = result;
  }

  static fromStringObj(s: ResponseString): ResponseTyped {
    return new ResponseTyped(
      ResultTyped.fromStringObj(s.result)
    );
  }

  toStringObj(): ResponseString {
    return new ResponseString(
      this.result.toStringObj()
    );
  }

  static toStringList(list: ResponseTyped[]): ResponseString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ResponseString[]): ResponseTyped[] {
    return list.map(s => ResponseTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      result: this.result.toJsonValue(),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ResponseTyped {
    return new ResponseTyped(
      ResultTyped.fromJsonValue(_json.requireField(m, "result"))
    );
  }

  static fromJSON(text: string): ResponseTyped {
    return ResponseTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ResponseTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ResponseTyped[] {
    const raw = _json.asArray(_json.parse(text), "ResponseTyped") ?? [];
    return raw.map((e) => ResponseTyped.fromJsonValue(e));
  }

  toString(): string {
    return `result=${this.result}`;
  }

  equals(other: ResponseTyped): boolean {
    return this.result.equals(other.result);
  }
}
