import { IDValueString } from "./IDValueString.js";
import * as _json from "./json.js";

export class IDValueTyped {
  iD: IDForm;
  value: number;

  constructor(iD: IDForm, value: number) {
    this.iD = iD;
    this.value = value;
  }

  static fromStringObj(s: IDValueString): IDValueTyped {
    return new IDValueTyped(
      new IDForm(s.iD),
      s.value !== "" ? Number(s.value) : 0
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      iD: this.iD == null ? null : String(this.iD),
      value: this.value,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): IDValueTyped {
    return new IDValueTyped(
      new IDForm(_json.asString(_json.requireField(m, "iD"), "iD")),
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
}
