export class AddressComponents {
  zip: string;
  streetName: string;
  city: string;
  preDirection: string;
  suffixDirection: string;
  state: string;
  suffixType: string;

  constructor(zip: string, streetName: string, city: string, preDirection: string, suffixDirection: string, state: string, suffixType: string) {
    this.zip = zip;
    this.streetName = streetName;
    this.city = city;
    this.preDirection = preDirection;
    this.suffixDirection = suffixDirection;
    this.state = state;
    this.suffixType = suffixType;
  }
}
