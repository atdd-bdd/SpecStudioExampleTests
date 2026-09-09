import * as tokens from "./tokens.js";

export class AddressString {
  static DNC_STRING = "?DNC?";

  constructor(street = "", city = "", state = "", zIP = "") {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new AddressString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 4, "Address");
    return new AddressString(
      parts[0],
      parts[1],
      parts[2],
      parts[3]
    );
  }

  toString() {
    return tokens.token(this.street) + " " + tokens.token(this.city) + " " + tokens.token(this.state) + " " + tokens.token(this.zIP);
  }

  equals(other) {
    if (!(other instanceof AddressString)) return false;
    return (this.street === AddressString.DNC_STRING || other.street === AddressString.DNC_STRING || this.street === other.street)
      && (this.city === AddressString.DNC_STRING || other.city === AddressString.DNC_STRING || this.city === other.city)
      && (this.state === AddressString.DNC_STRING || other.state === AddressString.DNC_STRING || this.state === other.state)
      && (this.zIP === AddressString.DNC_STRING || other.zIP === AddressString.DNC_STRING || this.zIP === other.zIP);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
