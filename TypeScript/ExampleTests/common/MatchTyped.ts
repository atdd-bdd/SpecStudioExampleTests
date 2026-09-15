import { MatchString } from "./MatchString.js";
import * as _json from "./json.js";
import { AddressComponentsTyped } from "./AddressComponentsTyped.js";

export class MatchTyped {
  matchedAddress: string;
  addressComponents: AddressComponentsTyped;

  constructor(matchedAddress: string, addressComponents: AddressComponentsTyped) {
    this.matchedAddress = matchedAddress;
    this.addressComponents = addressComponents;
  }

  static fromStringObj(s: MatchString): MatchTyped {
    return new MatchTyped(
      s.matchedAddress,
      AddressComponentsTyped.fromStringObj(s.addressComponents)
    );
  }

  toStringObj(): MatchString {
    return new MatchString(
      String(this.matchedAddress),
      this.addressComponents.toStringObj()
    );
  }

  static toStringList(list: MatchTyped[]): MatchString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: MatchString[]): MatchTyped[] {
    return list.map(s => MatchTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      matchedAddress: this.matchedAddress,
      addressComponents: this.addressComponents.toJsonValue(),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): MatchTyped {
    return new MatchTyped(
      _json.asString(_json.requireField(m, "matchedAddress"), "matchedAddress"),
      AddressComponentsTyped.fromJsonValue(_json.requireField(m, "addressComponents"))
    );
  }

  static fromJSON(text: string): MatchTyped {
    return MatchTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly MatchTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): MatchTyped[] {
    const raw = _json.asArray(_json.parse(text), "MatchTyped") ?? [];
    return raw.map((e) => MatchTyped.fromJsonValue(e));
  }

  toString(): string {
    return `matchedAddress=${this.matchedAddress}, addressComponents=${this.addressComponents}`;
  }

  equals(other: MatchTyped): boolean {
    return this.matchedAddress === other.matchedAddress
      && this.addressComponents.equals(other.addressComponents);
  }
}
