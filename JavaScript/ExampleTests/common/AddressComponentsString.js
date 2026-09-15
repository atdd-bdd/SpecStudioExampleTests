import * as tokens from "./tokens.js";

export class AddressComponentsString {
  static DNC_STRING = "?DNC?";

  constructor(zip = "", streetName = "", city = "", preDirection = "", suffixDirection = "", state = "", suffixType = "") {
    this.zip = zip;
    this.streetName = streetName;
    this.city = city;
    this.preDirection = preDirection;
    this.suffixDirection = suffixDirection;
    this.state = state;
    this.suffixType = suffixType;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new AddressComponentsString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? "",
      v[5] ?? "",
      v[6] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
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

  toString() {
    return tokens.token(this.zip) + " " + tokens.token(this.streetName) + " " + tokens.token(this.city) + " " + tokens.token(this.preDirection) + " " + tokens.token(this.suffixDirection) + " " + tokens.token(this.state) + " " + tokens.token(this.suffixType);
  }

  equals(other) {
    if (!(other instanceof AddressComponentsString)) return false;
    return (this.zip === AddressComponentsString.DNC_STRING || other.zip === AddressComponentsString.DNC_STRING || this.zip === other.zip)
      && (this.streetName === AddressComponentsString.DNC_STRING || other.streetName === AddressComponentsString.DNC_STRING || this.streetName === other.streetName)
      && (this.city === AddressComponentsString.DNC_STRING || other.city === AddressComponentsString.DNC_STRING || this.city === other.city)
      && (this.preDirection === AddressComponentsString.DNC_STRING || other.preDirection === AddressComponentsString.DNC_STRING || this.preDirection === other.preDirection)
      && (this.suffixDirection === AddressComponentsString.DNC_STRING || other.suffixDirection === AddressComponentsString.DNC_STRING || this.suffixDirection === other.suffixDirection)
      && (this.state === AddressComponentsString.DNC_STRING || other.state === AddressComponentsString.DNC_STRING || this.state === other.state)
      && (this.suffixType === AddressComponentsString.DNC_STRING || other.suffixType === AddressComponentsString.DNC_STRING || this.suffixType === other.suffixType);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
