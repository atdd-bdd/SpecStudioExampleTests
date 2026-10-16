import { AddressString } from "./AddressString.js";
import * as _json from "./json.js";
import { SimpleTextTyped } from "./SimpleTextTyped.js";

export class AddressTyped {
  street: SimpleTextTyped;
  city: SimpleTextTyped;
  state: SimpleTextTyped;
  zIP: SimpleTextTyped;

  constructor(street: SimpleTextTyped, city: SimpleTextTyped, state: SimpleTextTyped, zIP: SimpleTextTyped) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromStringObj(s: AddressString): AddressTyped {
    return new AddressTyped(
      new SimpleTextTyped(s.street),
      new SimpleTextTyped(s.city),
      new SimpleTextTyped(s.state),
      new SimpleTextTyped(s.zIP)
    );
  }

  toStringObj(): AddressString {
    return new AddressString(
      String(this.street),
      String(this.city),
      String(this.state),
      String(this.zIP)
    );
  }

  static toStringList(list: AddressTyped[]): AddressString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: AddressString[]): AddressTyped[] {
    return list.map(s => AddressTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      street: String(this.street),
      city: String(this.city),
      state: String(this.state),
      zIP: String(this.zIP),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): AddressTyped {
    return new AddressTyped(
      new SimpleTextTyped(_json.asString(_json.requireField(m, "street"), "street")),
      new SimpleTextTyped(_json.asString(_json.requireField(m, "city"), "city")),
      new SimpleTextTyped(_json.asString(_json.requireField(m, "state"), "state")),
      new SimpleTextTyped(_json.asString(_json.requireField(m, "zIP"), "zIP"))
    );
  }

  static fromJSON(text: string): AddressTyped {
    return AddressTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly AddressTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): AddressTyped[] {
    const raw = _json.asArray(_json.parse(text), "AddressTyped") ?? [];
    return raw.map((e) => AddressTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Street=${this.street}, City=${this.city}, State=${this.state}, ZIP=${this.zIP}`;
  }

  equals(other: AddressTyped): boolean {
    return this.street.equals(other.street)
      && this.city.equals(other.city)
      && this.state.equals(other.state)
      && this.zIP.equals(other.zIP);
  }
}
