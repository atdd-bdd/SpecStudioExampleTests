import { AddressComponentsString } from "./AddressComponentsString.js";
import * as _json from "./json.js";

export class AddressComponentsTyped {
  constructor(zip = "", streetName = "", city = "", preDirection = "", suffixDirection = "", state = "", suffixType = "") {
    this.zip = zip;
    this.streetName = streetName;
    this.city = city;
    this.preDirection = preDirection;
    this.suffixDirection = suffixDirection;
    this.state = state;
    this.suffixType = suffixType;
  }

  static fromStringObj(s) {
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

  toStringObj() {
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

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => AddressComponentsTyped.fromStringObj(s));
  }

  toJsonValue() {
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

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new AddressComponentsTyped(
      _json.asString(_json.require(m, "zip"), "zip"),
      _json.asString(_json.require(m, "streetName"), "streetName"),
      _json.asString(_json.require(m, "city"), "city"),
      _json.asString(_json.require(m, "preDirection"), "preDirection"),
      _json.asString(_json.require(m, "suffixDirection"), "suffixDirection"),
      _json.asString(_json.require(m, "state"), "state"),
      _json.asString(_json.require(m, "suffixType"), "suffixType")
    );
  }

  static fromJSON(text) { return AddressComponentsTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "AddressComponentsTyped");
    return raw.map((e) => AddressComponentsTyped.fromJsonValue(e));
  }

  toString() {
    return `zip=${this.zip}, streetName=${this.streetName}, city=${this.city}, preDirection=${this.preDirection}, suffixDirection=${this.suffixDirection}, state=${this.state}, suffixType=${this.suffixType}`;
  }

  equals(other) {
    if (!(other instanceof AddressComponentsTyped)) return false;
    return this.zip === other.zip
      && this.streetName === other.streetName
      && this.city === other.city
      && this.preDirection === other.preDirection
      && this.suffixDirection === other.suffixDirection
      && this.state === other.state
      && this.suffixType === other.suffixType;
  }
}
