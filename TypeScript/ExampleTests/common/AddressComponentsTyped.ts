import { AddressComponentsString } from "./AddressComponentsString.js";
import * as _json from "./json.js";

export class AddressComponentsTyped {
  zip: string;
  streetName: string;
  city: string;
  preDirection: string;
  suffixDirection: string;
  state: string;
  suffixType: string;

  constructor(zip: string, streetName: string, city: string, preDirection: string, suffixDirection: string, state: string, suffixType: string) {
    this.zip = zip;
    this.streetName = streetName;
    this.city = city;
    this.preDirection = preDirection;
    this.suffixDirection = suffixDirection;
    this.state = state;
    this.suffixType = suffixType;
  }

  static fromStringObj(s: AddressComponentsString): AddressComponentsTyped {
    return new AddressComponentsTyped(
      s.zip,
      s.streetName,
      s.city,
      s.preDirection,
      s.suffixDirection,
      s.state,
      s.suffixType
    );
  }

  toStringObj(): AddressComponentsString {
    return new AddressComponentsString(
      String(this.zip),
      String(this.streetName),
      String(this.city),
      String(this.preDirection),
      String(this.suffixDirection),
      String(this.state),
      String(this.suffixType)
    );
  }

  static toStringList(list: AddressComponentsTyped[]): AddressComponentsString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: AddressComponentsString[]): AddressComponentsTyped[] {
    return list.map(s => AddressComponentsTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      zip: this.zip,
      streetName: this.streetName,
      city: this.city,
      preDirection: this.preDirection,
      suffixDirection: this.suffixDirection,
      state: this.state,
      suffixType: this.suffixType,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): AddressComponentsTyped {
    return new AddressComponentsTyped(
      _json.asString(_json.requireField(m, "zip"), "zip"),
      _json.asString(_json.requireField(m, "streetName"), "streetName"),
      _json.asString(_json.requireField(m, "city"), "city"),
      _json.asString(_json.requireField(m, "preDirection"), "preDirection"),
      _json.asString(_json.requireField(m, "suffixDirection"), "suffixDirection"),
      _json.asString(_json.requireField(m, "state"), "state"),
      _json.asString(_json.requireField(m, "suffixType"), "suffixType")
    );
  }

  static fromJSON(text: string): AddressComponentsTyped {
    return AddressComponentsTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly AddressComponentsTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): AddressComponentsTyped[] {
    const raw = _json.asArray(_json.parse(text), "AddressComponentsTyped") ?? [];
    return raw.map((e) => AddressComponentsTyped.fromJsonValue(e));
  }

  toString(): string {
    return `zip=${this.zip}, streetName=${this.streetName}, city=${this.city}, preDirection=${this.preDirection}, suffixDirection=${this.suffixDirection}, state=${this.state}, suffixType=${this.suffixType}`;
  }

  equals(other: AddressComponentsTyped): boolean {
    return this.zip === other.zip
      && this.streetName === other.streetName
      && this.city === other.city
      && this.preDirection === other.preDirection
      && this.suffixDirection === other.suffixDirection
      && this.state === other.state
      && this.suffixType === other.suffixType;
  }
}
