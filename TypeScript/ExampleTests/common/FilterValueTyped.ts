import { FilterValueString } from "./FilterValueString.js";
import * as _json from "./json.js";

export class FilterValueTyped {
  value: IDForm;

  constructor(value: IDForm) {
    this.value = value;
  }

  static fromStringObj(s: FilterValueString): FilterValueTyped {
    return new FilterValueTyped(
      new IDForm(s.value)
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      value: this.value == null ? null : String(this.value),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): FilterValueTyped {
    return new FilterValueTyped(
      new IDForm(_json.asString(_json.requireField(m, "value"), "value"))
    );
  }

  static fromJSON(text: string): FilterValueTyped {
    return FilterValueTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly FilterValueTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): FilterValueTyped[] {
    const raw = _json.asArray(_json.parse(text), "FilterValueTyped") ?? [];
    return raw.map((e) => FilterValueTyped.fromJsonValue(e));
  }
}
