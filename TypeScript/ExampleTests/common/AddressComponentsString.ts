
import * as tokens from "./tokens.js";

export class AddressComponentsString {
  static readonly DNC_STRING = "?DNC?";

  zip: string;
  streetName: string;
  city: string;
  preDirection: string;
  suffixDirection: string;
  state: string;
  suffixType: string;

  constructor(zip: string = "", streetName: string = "", city: string = "", preDirection: string = "", suffixDirection: string = "", state: string = "", suffixType: string = "") {
    this.zip = zip;
    this.streetName = streetName;
    this.city = city;
    this.preDirection = preDirection;
    this.suffixDirection = suffixDirection;
    this.state = state;
    this.suffixType = suffixType;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): AddressComponentsString {
    const parts = tokens.require_(text, 7, "AddressComponents");
    return new AddressComponentsString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4],
      parts[5],
      parts[6]
    );
  }

  static fromList(values: Iterable<string>): AddressComponentsString {
    const v = Array.from(values);
    const r = new AddressComponentsString();
    r.zip = v[0] ?? "";
    r.streetName = v[1] ?? "";
    r.city = v[2] ?? "";
    r.preDirection = v[3] ?? "";
    r.suffixDirection = v[4] ?? "";
    r.state = v[5] ?? "";
    r.suffixType = v[6] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.zip) + " " + tokens.token(this.streetName) + " " + tokens.token(this.city) + " " + tokens.token(this.preDirection) + " " + tokens.token(this.suffixDirection) + " " + tokens.token(this.state) + " " + tokens.token(this.suffixType);
  }

  equals(other: AddressComponentsString): boolean {
    return (this.zip === AddressComponentsString.DNC_STRING || other.zip === AddressComponentsString.DNC_STRING || this.zip === other.zip)
      && (this.streetName === AddressComponentsString.DNC_STRING || other.streetName === AddressComponentsString.DNC_STRING || this.streetName === other.streetName)
      && (this.city === AddressComponentsString.DNC_STRING || other.city === AddressComponentsString.DNC_STRING || this.city === other.city)
      && (this.preDirection === AddressComponentsString.DNC_STRING || other.preDirection === AddressComponentsString.DNC_STRING || this.preDirection === other.preDirection)
      && (this.suffixDirection === AddressComponentsString.DNC_STRING || other.suffixDirection === AddressComponentsString.DNC_STRING || this.suffixDirection === other.suffixDirection)
      && (this.state === AddressComponentsString.DNC_STRING || other.state === AddressComponentsString.DNC_STRING || this.state === other.state)
      && (this.suffixType === AddressComponentsString.DNC_STRING || other.suffixType === AddressComponentsString.DNC_STRING || this.suffixType === other.suffixType);
  }

  static equalLists(a: AddressComponentsString[], b: AddressComponentsString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
