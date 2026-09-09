
import * as tokens from "./tokens.js";

export class AddressString {
  static readonly DNC_STRING = "?DNC?";

  street: string;
  city: string;
  state: string;
  zIP: string;

  constructor(street: string = "", city: string = "", state: string = "", zIP: string = "") {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): AddressString {
    const parts = tokens.require_(text, 4, "Address");
    return new AddressString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  static fromList(values: Iterable<string>): AddressString {
    const v = Array.from(values);
    const r = new AddressString();
    r.street = v[0] ?? "";
    r.city = v[1] ?? "";
    r.state = v[2] ?? "";
    r.zIP = v[3] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.street) + " " + tokens.token(this.city) + " " + tokens.token(this.state) + " " + tokens.token(this.zIP);
  }

  equals(other: AddressString): boolean {
    return (this.street === AddressString.DNC_STRING || other.street === AddressString.DNC_STRING || this.street === other.street)
      && (this.city === AddressString.DNC_STRING || other.city === AddressString.DNC_STRING || this.city === other.city)
      && (this.state === AddressString.DNC_STRING || other.state === AddressString.DNC_STRING || this.state === other.state)
      && (this.zIP === AddressString.DNC_STRING || other.zIP === AddressString.DNC_STRING || this.zIP === other.zIP);
  }

  static equalLists(a: AddressString[], b: AddressString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
