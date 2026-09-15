import { ResultString } from "./ResultString.js";
import * as _json from "./json.js";
import { MatchTyped } from "./MatchTyped.js";

export class ResultTyped {
  addressMatches: MatchTyped[];

  constructor(addressMatches: MatchTyped[]) {
    this.addressMatches = addressMatches;
  }

  static fromStringObj(s: ResultString): ResultTyped {
    return new ResultTyped(
      []
    );
  }

  toStringObj(): ResultString {
    return new ResultString(
      ""
    );
  }

  static toStringList(list: ResultTyped[]): ResultString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ResultString[]): ResultTyped[] {
    return list.map(s => ResultTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      addressMatches: this.addressMatches.map((e) => e.toJsonValue()),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ResultTyped {
    return new ResultTyped(
      (_json.asArray(_json.requireField(m, "addressMatches"), "addressMatches") ?? []).map((e) => MatchTyped.fromJsonValue(e))
    );
  }

  static fromJSON(text: string): ResultTyped {
    return ResultTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ResultTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ResultTyped[] {
    const raw = _json.asArray(_json.parse(text), "ResultTyped") ?? [];
    return raw.map((e) => ResultTyped.fromJsonValue(e));
  }

  toString(): string {
    return `addressMatches=${this.addressMatches}`;
  }

  equals(other: ResultTyped): boolean {
    return this.addressMatches === other.addressMatches;
  }
}
