import { AddressString } from "./AddressString.js";
import * as _json from "./json.js";

export class AddressTyped {
  street: string;
  city: string;
  state: string;
  zIP: string;

  constructor(street: string, city: string, state: string, zIP: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromStringObj(s: AddressString): AddressTyped {
    return new AddressTyped(
      s.street,
      s.city,
      s.state,
      s.zIP
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
      street: this.street,
      city: this.city,
      state: this.state,
      zIP: this.zIP,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): AddressTyped {
    return new AddressTyped(
      _json.asString(_json.requireField(m, "street"), "street"),
      _json.asString(_json.requireField(m, "city"), "city"),
      _json.asString(_json.requireField(m, "state"), "state"),
      _json.asString(_json.requireField(m, "zIP"), "zIP")
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
    return this.street === other.street
      && this.city === other.city
      && this.state === other.state
      && this.zIP === other.zIP;
  }
}
