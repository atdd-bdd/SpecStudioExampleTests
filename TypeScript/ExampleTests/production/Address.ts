export class Address {
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
}
