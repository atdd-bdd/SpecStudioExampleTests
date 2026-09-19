import { InputControlValuesString } from "./InputControlValuesString.js";
import * as _json from "./json.js";

export class InputControlValuesTyped {
  frame: number;
  roll: string;
  remaining: string;

  constructor(frame: number, roll: string, remaining: string) {
    this.frame = frame;
    this.roll = roll;
    this.remaining = remaining;
  }

  static fromStringObj(s: InputControlValuesString): InputControlValuesTyped {
    return new InputControlValuesTyped(
      s.frame !== "" ? Number(s.frame) : 0,
      s.roll,
      s.remaining
    );
  }

  toStringObj(): InputControlValuesString {
    return new InputControlValuesString(
      String(this.frame),
      String(this.roll),
      String(this.remaining)
    );
  }

  static toStringList(list: InputControlValuesTyped[]): InputControlValuesString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: InputControlValuesString[]): InputControlValuesTyped[] {
    return list.map(s => InputControlValuesTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      frame: this.frame,
      roll: this.roll,
      remaining: this.remaining,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): InputControlValuesTyped {
    return new InputControlValuesTyped(
      _json.asInt(_json.requireField(m, "frame"), "frame"),
      _json.asString(_json.requireField(m, "roll"), "roll"),
      _json.asString(_json.requireField(m, "remaining"), "remaining")
    );
  }

  static fromJSON(text: string): InputControlValuesTyped {
    return InputControlValuesTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly InputControlValuesTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): InputControlValuesTyped[] {
    const raw = _json.asArray(_json.parse(text), "InputControlValuesTyped") ?? [];
    return raw.map((e) => InputControlValuesTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Frame=${this.frame}, Roll=${this.roll}, Remaining=${this.remaining}`;
  }

  equals(other: InputControlValuesTyped): boolean {
    return this.frame === other.frame
      && this.roll === other.roll
      && this.remaining === other.remaining;
  }
}
