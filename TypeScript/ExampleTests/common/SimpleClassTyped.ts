import { SimpleClassString } from "./SimpleClassString.js";
import * as _json from "./json.js";

export class SimpleClassTyped {
  anInt: number;
  aString: string;

  constructor(anInt: number, aString: string) {
    this.anInt = anInt;
    this.aString = aString;
  }

  static fromStringObj(s: SimpleClassString): SimpleClassTyped {
    return new SimpleClassTyped(
      s.anInt !== "" ? Number(s.anInt) : 0,
      s.aString
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      anInt: this.anInt,
      aString: this.aString,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): SimpleClassTyped {
    return new SimpleClassTyped(
      _json.asInt(_json.requireField(m, "anInt"), "anInt"),
      _json.asString(_json.requireField(m, "aString"), "aString")
    );
  }

  static fromJSON(text: string): SimpleClassTyped {
    return SimpleClassTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly SimpleClassTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): SimpleClassTyped[] {
    const raw = _json.asArray(_json.parse(text), "SimpleClassTyped") ?? [];
    return raw.map((e) => SimpleClassTyped.fromJsonValue(e));
  }

  toString(): string {
    return `anInt=${this.anInt}, aString=${this.aString}`;
  }

  equals(other: SimpleClassTyped): boolean {
    return this.anInt === other.anInt
      && this.aString === other.aString;
  }
}
