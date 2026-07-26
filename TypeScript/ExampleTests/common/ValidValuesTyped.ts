import { ValidValuesString } from "./ValidValuesString.js";
import * as _json from "./json.js";

export class ValidValuesTyped {
  value: string;
  isValid: boolean;
  notes: string;

  constructor(value: string, isValid: boolean, notes: string) {
    this.value = value;
    this.isValid = isValid;
    this.notes = notes;
  }

  static fromStringObj(s: ValidValuesString): ValidValuesTyped {
    return new ValidValuesTyped(
      s.value,
      ["true","t","yes","y","1"].includes(s.isValid.toLowerCase()),
      s.notes
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      value: this.value,
      isValid: this.isValid,
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ValidValuesTyped {
    return new ValidValuesTyped(
      _json.asString(_json.requireField(m, "value"), "value"),
      _json.asBool(_json.requireField(m, "isValid"), "isValid"),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): ValidValuesTyped {
    return ValidValuesTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ValidValuesTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ValidValuesTyped[] {
    const raw = _json.asArray(_json.parse(text), "ValidValuesTyped") ?? [];
    return raw.map((e) => ValidValuesTyped.fromJsonValue(e));
  }
}
