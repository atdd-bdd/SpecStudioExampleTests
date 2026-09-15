import { MatchString } from "./MatchString.js";
import * as _json from "./json.js";
import { AddressComponentsTyped } from "./AddressComponentsTyped.js";

export class MatchTyped {
  constructor(matchedAddress = "", addressComponents = "") {
    this.matchedAddress = matchedAddress;
    this.addressComponents = addressComponents;
  }

  static fromStringObj(s) {
    return new MatchTyped(
      s.matchedAddress,
      AddressComponentsTyped.fromStringObj(s.addressComponents)
    );
  }

  toStringObj() {
    return new MatchString(
      String(this.matchedAddress),
      this.addressComponents.toStringObj()
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => MatchTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      matchedAddress: this.matchedAddress,
      addressComponents: this.addressComponents.toJsonValue(),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new MatchTyped(
      _json.asString(_json.require(m, "matchedAddress"), "matchedAddress"),
      AddressComponentsTyped.fromJsonValue(_json.require(m, "addressComponents"))
    );
  }

  static fromJSON(text) { return MatchTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "MatchTyped");
    return raw.map((e) => MatchTyped.fromJsonValue(e));
  }

  toString() {
    return `matchedAddress=${this.matchedAddress}, addressComponents=${this.addressComponents}`;
  }

  equals(other) {
    if (!(other instanceof MatchTyped)) return false;
    return this.matchedAddress === other.matchedAddress
      && this.addressComponents.equals(other.addressComponents);
  }
}
