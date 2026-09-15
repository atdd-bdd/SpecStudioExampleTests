import { IDValueString } from "./IDValueString.js";
import * as _json from "./json.js";

export class IDValueTyped {
  iD: string;
  value: number;

  constructor(iD: string, value: number) {
    this.iD = iD;
    this.value = value;
  }

  static fromStringObj(s: IDValueString): IDValueTyped {
    return new IDValueTyped(
      s.iD,
      s.value !== "" ? Number(s.value) : 0
    );
  }

  toStringObj(): IDValueString {
    return new IDValueString(
      String(this.iD),
      String(this.value)
    );
  }

  static toStringList(list: IDValueTyped[]): IDValueString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: IDValueString[]): IDValueTyped[] {
    return list.map(s => IDValueTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      iD: this.iD,
      value: this.value,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): IDValueTyped {
    return new IDValueTyped(
      _json.asString(_json.requireField(m, "iD"), "iD"),
      _json.asInt(_json.requireField(m, "value"), "value")
    );
  }

  static fromJSON(text: string): IDValueTyped {
    return IDValueTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly IDValueTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): IDValueTyped[] {
    const raw = _json.asArray(_json.parse(text), "IDValueTyped") ?? [];
    return raw.map((e) => IDValueTyped.fromJsonValue(e));
  }

  toString(): string {
    return `ID=${this.iD}, Value=${this.value}`;
  }

  equals(other: IDValueTyped): boolean {
    return this.iD === other.iD
      && this.value === other.value;
  }
}
