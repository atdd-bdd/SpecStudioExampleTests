import { AddressComponentsString } from "./AddressComponentsString.js";

import * as tokens from "./tokens.js";

export class MatchString {
  static readonly DNC_STRING = "?DNC?";

  matchedAddress: string;
  addressComponents: AddressComponentsString;

  constructor(matchedAddress: string = "", addressComponents: AddressComponentsString = new AddressComponentsString()) {
    this.matchedAddress = matchedAddress;
    this.addressComponents = addressComponents;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): MatchString {
    const parts = tokens.require_(text, 2, "Match");
    return new MatchString(
      parts[0],
      AddressComponentsString.fromText(parts[1])
    );
  }

  static fromList(values: Iterable<string>): MatchString {
    const v = Array.from(values);
    const r = new MatchString();
    r.matchedAddress = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.matchedAddress) + " " + tokens.nested(String(this.addressComponents));
  }

  equals(other: MatchString): boolean {
    return (this.matchedAddress === MatchString.DNC_STRING || other.matchedAddress === MatchString.DNC_STRING || this.matchedAddress === other.matchedAddress)
      && this.addressComponents.equals(other.addressComponents);
  }

  static equalLists(a: MatchString[], b: MatchString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
