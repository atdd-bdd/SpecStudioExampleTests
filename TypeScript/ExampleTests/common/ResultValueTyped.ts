import { ResultValueString } from "./ResultValueString.js";
import * as _json from "./json.js";

export class ResultValueTyped {
  sum: number;

  constructor(sum: number) {
    this.sum = sum;
  }

  static fromStringObj(s: ResultValueString): ResultValueTyped {
    return new ResultValueTyped(
      s.sum !== "" ? Number(s.sum) : 0
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      sum: this.sum,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ResultValueTyped {
    return new ResultValueTyped(
      _json.asInt(_json.requireField(m, "sum"), "sum")
    );
  }

  static fromJSON(text: string): ResultValueTyped {
    return ResultValueTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ResultValueTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ResultValueTyped[] {
    const raw = _json.asArray(_json.parse(text), "ResultValueTyped") ?? [];
    return raw.map((e) => ResultValueTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Sum=${this.sum}`;
  }

  equals(other: ResultValueTyped): boolean {
    return this.sum === other.sum;
  }
}
