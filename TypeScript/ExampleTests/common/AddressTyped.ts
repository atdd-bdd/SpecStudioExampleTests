import { AddressString } from "./AddressString.js";
import * as _json from "./json.js";

export class AddressTyped {
  street: SimpleText;
  city: SimpleText;
  state: SimpleText;
  zIP: SimpleText;

  constructor(street: SimpleText, city: SimpleText, state: SimpleText, zIP: SimpleText) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromStringObj(s: AddressString): AddressTyped {
    return new AddressTyped(
      new SimpleText(s.street),
      new SimpleText(s.city),
      new SimpleText(s.state),
      new SimpleText(s.zIP)
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      street: this.street == null ? null : String(this.street),
      city: this.city == null ? null : String(this.city),
      state: this.state == null ? null : String(this.state),
      zIP: this.zIP == null ? null : String(this.zIP),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): AddressTyped {
    return new AddressTyped(
      new SimpleText(_json.asString(_json.requireField(m, "street"), "street")),
      new SimpleText(_json.asString(_json.requireField(m, "city"), "city")),
      new SimpleText(_json.asString(_json.requireField(m, "state"), "state")),
      new SimpleText(_json.asString(_json.requireField(m, "zIP"), "zIP"))
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
}
