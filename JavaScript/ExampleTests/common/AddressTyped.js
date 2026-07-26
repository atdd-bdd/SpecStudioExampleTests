import { AddressString } from "./AddressString.js";
import * as _json from "./json.js";

export class AddressTyped {
  constructor(street = "", city = "", state = "", zIP = "") {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromStringObj(s) {
    return new AddressTyped(
      s.street,
      s.city,
      s.state,
      s.zIP
    );
  }

  toJsonValue() {
    return {
      street: this.street == null ? null : String(this.street),
      city: this.city == null ? null : String(this.city),
      state: this.state == null ? null : String(this.state),
      zIP: this.zIP == null ? null : String(this.zIP),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new AddressTyped(
      new SimpleText(_json.asString(_json.require(m, "street"), "street")),
      new SimpleText(_json.asString(_json.require(m, "city"), "city")),
      new SimpleText(_json.asString(_json.require(m, "state"), "state")),
      new SimpleText(_json.asString(_json.require(m, "zIP"), "zIP"))
    );
  }

  static fromJSON(text) { return AddressTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "AddressTyped");
    return raw.map((e) => AddressTyped.fromJsonValue(e));
  }

  toString() {
    return `Street=${this.street}, City=${this.city}, State=${this.state}, ZIP=${this.zIP}`;
  }

  equals(other) {
    if (!(other instanceof AddressTyped)) return false;
    return this.street === other.street
      && this.city === other.city
      && this.state === other.state
      && this.zIP === other.zIP;
  }
}
