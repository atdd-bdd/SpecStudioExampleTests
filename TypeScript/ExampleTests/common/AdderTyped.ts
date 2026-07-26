import { AdderString } from "./AdderString.js";
import * as _json from "./json.js";

export class AdderTyped {
  number1: number;
  number2: number;
  result: number;

  constructor(number1: number, number2: number, result: number) {
    this.number1 = number1;
    this.number2 = number2;
    this.result = result;
  }

  static fromStringObj(s: AdderString): AdderTyped {
    return new AdderTyped(
      s.number1 !== "" ? Number(s.number1) : 0,
      s.number2 !== "" ? Number(s.number2) : 0,
      s.result !== "" ? Number(s.result) : 0
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      number1: this.number1,
      number2: this.number2,
      result: this.result,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): AdderTyped {
    return new AdderTyped(
      _json.asInt(_json.requireField(m, "number1"), "number1"),
      _json.asInt(_json.requireField(m, "number2"), "number2"),
      _json.asInt(_json.requireField(m, "result"), "result")
    );
  }

  static fromJSON(text: string): AdderTyped {
    return AdderTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly AdderTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): AdderTyped[] {
    const raw = _json.asArray(_json.parse(text), "AdderTyped") ?? [];
    return raw.map((e) => AdderTyped.fromJsonValue(e));
  }
}
