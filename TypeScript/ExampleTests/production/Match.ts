import { AddressComponents } from "./AddressComponents.js";

export class Match {
  matchedAddress: string;
  addressComponents: AddressComponents;

  constructor(matchedAddress: string, addressComponents: AddressComponents) {
    this.matchedAddress = matchedAddress;
    this.addressComponents = addressComponents;
  }
}
