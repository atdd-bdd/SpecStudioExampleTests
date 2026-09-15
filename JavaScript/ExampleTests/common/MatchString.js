import { AddressComponentsString } from "./AddressComponentsString.js";
import * as tokens from "./tokens.js";

export class MatchString {
  static DNC_STRING = "?DNC?";

  constructor(matchedAddress = "", addressComponents = "") {
    this.matchedAddress = matchedAddress;
    this.addressComponents = addressComponents;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new MatchString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 2, "Match");
    return new MatchString(
      parts[0],
      AddressComponentsString.fromText(parts[1])
    );
  }

  toString() {
    return tokens.token(this.matchedAddress) + " " + tokens.nested(String(this.addressComponents));
  }

  equals(other) {
    if (!(other instanceof MatchString)) return false;
    return (this.matchedAddress === MatchString.DNC_STRING || other.matchedAddress === MatchString.DNC_STRING || this.matchedAddress === other.matchedAddress)
      && this.addressComponents.equals(other.addressComponents);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
